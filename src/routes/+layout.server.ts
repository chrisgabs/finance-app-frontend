import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { supabase } from '$lib/supabaseClient';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: getServerSession(event)
	}
};