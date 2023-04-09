import type { Actions, PageServerLoad } from './$types';
import { redirect } from "@sveltejs/kit"

// --------- LOAD FUNCTIONS ---------


// --------- ACTIONS ---------

export const actions = {
    login: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());
        const email = body.email as string
        const password = body.password as string

        const { data, error } = await locals.sb.auth.signInWithPassword({
            email, password
        })

        if (data.session) {
            throw redirect(303, "/")
        }

        if (error) {
            return {message: error?.message};
        }
    },

    register: async ({ request, locals }) => {
        console.log("register started")
        const data = await request.formData();
        const email = data.get("email")!.toString()
        const first_name = email.split("@")[0]

        locals.sb.auth.signUp({
            email: email,
            password: data.get("password")!.toString(),
            options: {
                data: {
                    first_name: first_name,
                    last_name: "deeznuts"
                }
            }
        }).then(async (response) => {
            console.log(response)
            // const {id, email} = response.data.user!
            // console.log()
            // const {data, error} = await supabase.from("profiles").upsert({
            //   id: id,
            //   email: email,
            //   first_name: "firstnameu",
            //   last_name: "lastnameu"
            // })
            // console.log(data)
        }).catch((err) => {
            console.log(err)
        })

        console.log("register end")
    },

} satisfies Actions;