import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import "../../chunks/supabaseClient.js";
const load = async (event) => {
  console.log("--- refreshed ---");
  return {
    session: getServerSession(event)
  };
};
export {
  load
};
