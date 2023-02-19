// functions that the client will call hereimport { error } from '@sveltejs/kit';
import { error } from "@sveltejs/kit";
import type { RequestOptions } from "@sveltejs/kit/types/private";

const base:string = 'http://localhost:5173/api';

type sendParams = {
    method: string,
    path: string,
    data?: JSON,
}

async function send({ method, path, data }: sendParams) {
	const opts:any = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	// if (token) {
	// 	opts.headers['Authorization'] = `Token ${token}`;
	// }

	const res = await fetch(`${base}/${path}`, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function get(path:string) {
	return send({ method: 'GET', path});
}

export function del(path:string) {
	return send({ method: 'DELETE', path });
}

export function post(path:string, data:JSON) {
	return send({ method: 'POST', path, data});
}

export function put(path:string, data:JSON) {
	return send({ method: 'PUT', path, data});
}
