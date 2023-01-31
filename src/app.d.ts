/// <reference types="@sveltejs/kit" />

import type { Session, SupabaseClient } from "@supabase/supabase-js";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			sb: SupabaseClient
			session: Session | null
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
