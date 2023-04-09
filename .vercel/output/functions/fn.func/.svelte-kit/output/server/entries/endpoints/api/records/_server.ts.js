import "../../../../chunks/index.js";
const GET = async ({ locals, url }) => {
  const id = Number(url.searchParams.get("id") ?? "0");
  const { error: error2, data } = await locals.sb.from("fin_records").select().eq("id", id).limit(1).single();
  console.log("queried data:");
  console.log(data);
  if (error2) {
    return new Response(JSON.stringify({ error: error2 }));
  }
  return new Response(JSON.stringify({ data }));
};
export {
  GET
};
