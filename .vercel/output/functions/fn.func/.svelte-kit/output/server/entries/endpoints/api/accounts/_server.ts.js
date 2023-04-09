import "../../../../chunks/index.js";
const GET = async ({ locals, url }) => {
  const name = url.searchParams.get("name") ?? "";
  const { error: error2, data } = await locals.sb.from("fin_accounts").select().eq("name", name).limit(1).single();
  console.log("queried data for name " + name + ":");
  console.log(data);
  if (error2) {
    return new Response(JSON.stringify({ error: error2 }));
  }
  return new Response(JSON.stringify({ data }));
};
export {
  GET
};
