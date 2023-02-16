import { records, accounts } from "../stores/stores"
import type { Actions, PageServerLoad } from './$types';
import {error, invalid, redirect} from "@sveltejs/kit"
import { time_ranges_to_array } from "svelte/internal";
import { supabase } from "$lib/supabaseClient";

// --------- LOAD FUNCTION ---------

export const load = (async ({ locals }) => {
	if (!locals.session) {
		return {
			accounts: [],
			records: []
		}
	}
	
	const accounts = await locals.sb.from("fin_accounts").select("id, name, balance")
	const records = await locals.sb.from("fin_records").select("id, purpose, amount, account, date_time, transaction_type")

	if (accounts.error){
		console.log("error")
		console.log(accounts.error);
	} else if (records.error){
		console.log(records.error);
	}

	return {
		accounts: accounts.data,
		records: records.data
	};
}) satisfies PageServerLoad;

// --------- ACTIONS ---------

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
		return error(500, {
			message: "Error boi"
		})
	}
  	
	// update stores

	console.log("login end")
  },

  logout: async({request, locals}) => {
	console.log("logout")
	const { error } = await locals.sb.auth.signOut()
	console.log(error)
	if (error) {
		console.log("error opccured")
		throw invalid(500, { message: "Something went wrong logging you out." })
	}

	throw redirect(300, "/login")
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
	},

	createAccount: async ({request, locals}) => {
		const body = Object.fromEntries(await request.formData());
		const name = body.name as string
		const balance = body.balance as string
		console.log(name, balance)
		const {data, error} = await locals.sb.from("fin_accounts").insert({
			name: name,
			balance: balance,
			owner: locals.session?.user.id
		}).select("id, name, balance").limit(1).single()

		if (error) {
			return invalid(400, {message: error})
		}

		if (data) {
			return {data: data}
		}
	},

	createRecord: async ({request, locals}) => {
		const body = Object.fromEntries(await request.formData());
		const purpose = body.purpose as string
		const account = body.account as string
		const amount = body.amount as string
		const note = body.note as string
		const transaction_type = body.transaction_type as string
		
		const {data, error} = await locals.sb.from("fin_records").insert({
			purpose: purpose,
			transaction_type: transaction_type,
			amount: amount,
			date_time: new Date(),
			account: account,
			description: note,
			owner: locals.session?.user.id
		}).select("id, purpose, transaction_type, amount, account, date_time").limit(1).single()

		if (error) {
			return invalid(400, {message: error})
		}

		if (data) {
			return {data: data}
		}
	}

} satisfies Actions;