// functions that the client will call hereimport { error } from '@sveltejs/kit';
import { error } from "@sveltejs/kit";
import type { RequestOptions } from "@sveltejs/kit/types/private";

const base:string = 'http://localhost:5173/api';

type sendParams = {
    method: string,
    path: string,
    data?: JSON,
    token: string
}

async function send({ method, path, data, token }: sendParams) {
	const opts:any = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	const res = await fetch(`${base}/${path}`, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function get(path:string, token:string) {
	return send({ method: 'GET', path, token });
}

export function del(path:string, token:string) {
	return send({ method: 'DELETE', path, token });
}

export function post(path:string, data:JSON, token:string) {
	return send({ method: 'POST', path, data, token });
}

export function put(path:string, data:JSON, token:string) {
	return send({ method: 'PUT', path, data, token });
}
