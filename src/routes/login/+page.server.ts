import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
// --------- LOAD FUNCTIONS ---------


// --------- ACTIONS ---------

export const actions = {
    login: async ({ request, locals: { supabase } }) => {
        // -------------------------- new --------------------------
        const formData = await request.formData();

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        console.log("error")
        if (error) {
            if (error instanceof AuthApiError && error.status === 400) {
                return fail(400, {
                    error: 'Invalid credentials.',
                    values: {
                        email
                    }
                });
            }
            return fail(500, {
                error: 'Server error. Try again later.',
                values: {
                    email
                }
            });
        }


        throw redirect(303, '/');
    },

    register: async ({ request, locals: { supabase } }) => {
        const data = await request.formData();
        const email = data.get("email")!.toString()
        const first_name = email.split("@")[0]

        supabase.auth.signUp({
            email: email,
            password: data.get("password")!.toString(),
            options: {
                data: {
                    first_name: first_name,
                    last_name: "deeznuts"
                }
            }
        }).then(async (response) => {
            console.log("signed up successfully")
            console.log(response)
        }).catch((err) => {
            console.log("sign up unsuccessful")
            console.log(err)
        })
    },

} satisfies Actions;