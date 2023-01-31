import { records, accounts, user } from "../stores/stores"
import type { Actions } from './$types';
import {fail, redirect} from "@sveltejs/kit"
import { error } from '@sveltejs/kit';
// /** @type {import('./$types').PageServerLoad} */
// export async function load() {
//     // Databaase.fetchRecords() returns a promise. should be .then() instead of try catch
//     let data = null;    
// }

export const actions = {
  login: async ({request, locals}) => {
    const body = Object.fromEntries(await request.formData());
    const email = body.email as string
    const password = body.password as string
	
	const {data, error:err} = await locals.sb.auth.signInWithPassword({
		email, password
	})

	if (err) {
		console.log(err)
		return fail(500, {
			message: "Error boi"
		})
	}
  // TODO log the user in
  console.log("login end")
	throw redirect(303, "/")
  },

  logout: async({request, locals}) => {
    console.log("logout")
    const { error: err } = await locals.sb.auth.signOut()

    if (err) {
      throw error(500, "Something went wrong logging you out.")
    }

    throw redirect(303, "/")
  },

  register: async({request, locals}) => {
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
	throw redirect(303, "/")
  } 
} satisfies Actions;