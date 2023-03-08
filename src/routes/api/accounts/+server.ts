// calls to supabase server will go here

import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import type { RequestHandler } from './$types';

export const GET = (async ({ locals, url }) => {

	const name:string = url.searchParams.get('name') ?? ''

	const { error, data } = await locals.sb.from("fin_accounts").select().eq("name", name).limit(1).single()
	console.log("queried data for name " + name + ":")
	console.log(data)

	if (error) {
		return new Response(JSON.stringify({ error: error }))
	}

	return new Response(JSON.stringify({ data: data }))

}) satisfies RequestHandler;