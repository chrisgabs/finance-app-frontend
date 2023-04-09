import { error, invalid } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import type { RequestHandler } from './$types';

export const GET = (async ( {locals, url} ) => {
	
	const id = Number(url.searchParams.get('id') ?? '0');

	const {error, data} = await locals.sb.from("fin_records").select().eq("id", id).limit(1).single()
	console.log("queried data:")
	console.log(data)

	if (error) {
		return new Response(JSON.stringify({error: error}))
	}

	return new Response(JSON.stringify({ data: data }))

})satisfies RequestHandler;