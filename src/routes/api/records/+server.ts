import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = (async ( {locals: {supabase}, url} ) => {
	
	const id = Number(url.searchParams.get('id') ?? '0');

	const {error, data} = await supabase.from("fin_records").select().eq("id", id).limit(1).single()
	console.log("queried data:")
	console.log(data)

	if (error) {
		return new Response(JSON.stringify({error: error}))
	}

	return new Response(JSON.stringify({ data: data }))

});