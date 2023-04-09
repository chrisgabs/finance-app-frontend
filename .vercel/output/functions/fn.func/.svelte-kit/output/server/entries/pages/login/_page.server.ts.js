import { r as redirect } from "../../../chunks/index.js";
import "../../../chunks/supabaseClient.js";
const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const email = body.email;
    const password = body.password;
    const { data, error: error2 } = await locals.sb.auth.signInWithPassword({
      email,
      password
    });
    if (data.session) {
      throw redirect(300, "/");
    }
    if (data) {
      return { message: error2?.message };
    }
  },
  register: async ({ request, locals }) => {
    console.log("register started");
    const data = await request.formData();
    const email = data.get("email").toString();
    const first_name = email.split("@")[0];
    locals.sb.auth.signUp({
      email,
      password: data.get("password").toString(),
      options: {
        data: {
          first_name,
          last_name: "deeznuts"
        }
      }
    }).then(async (response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
    console.log("register end");
  }
};
export {
  actions
};
