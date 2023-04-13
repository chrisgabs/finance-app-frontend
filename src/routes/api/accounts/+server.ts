// calls to supabase server will go here
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = (async ({ locals: {supabase}, url }) => {

	const name:string = url.searchParams.get('name') ?? ''

	const { error, data } = await supabase.from("fin_accounts").select().eq("name", name).limit(1).single()
	console.log("queried data for name " + name + ":")
	console.log(data)

	if (error) {
		return new Response(JSON.stringify({ error: error }))
	}

	return new Response(JSON.stringify({ data: data }))

});