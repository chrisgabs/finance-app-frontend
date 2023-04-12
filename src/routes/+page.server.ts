import type { Actions } from "./$types";
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {

    logout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut();
        throw redirect(303, '/login');
    }
}