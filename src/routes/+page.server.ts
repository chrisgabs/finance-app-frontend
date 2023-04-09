import { records, accounts } from "../stores/stores"
import type { Actions, PageServerLoad } from './$types';
import {error, redirect} from "@sveltejs/kit"
import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";
import type { recordType } from "src/types/record.type";
import type { accountType } from "src/types/account.type";
import { updateAccountOnCreate, updateAccountOnDelete } from "$lib/ledgerHandler";

// --------- LOAD FUNCTION ---------

export const load = (async ({ locals }) => {
	console.log("page.server |", locals.session?.user.email)
	if (!locals.session) {
		// console.log("there is no session, server side")
		return {
			accounts: [],
			records: []
		}
	}
	
	// console.log("THERE IS A SESSION SERVER SIDE")
	// Get accounts and records from database
	const receivedData = await locals.sb.from("fin_accounts").select("id, name, balance")
	const receivedRecords = await locals.sb.from("fin_records")
		.select("id, purpose, amount, account_id, date_time, transaction_type")
		.order("date_time", {ascending: false})

		
		// Check for errors
		if (receivedData.error){
			console.log("error")
			console.log(receivedData.error);
		} else if (receivedRecords.error){
			console.log(receivedRecords.error);
		}
		
		// Records PostgresReponse to Array
		let records: recordType[] = []
		let recordsData = receivedRecords.data
		let accounts: accountType[] = []
		let accountsData = receivedData.data

		for (let i = 0; i < recordsData!.length; i++) {
			const {id, purpose, amount, account_id, date_time, transaction_type} = recordsData![i]
			// Get account names associated with record
			const account_name = accountsData!.find((record) => record.id == account_id)?.name
			records.push({
				id, purpose, amount, account_id, date_time, transaction_type, key:id, account_name
			})
		}

		for (let i = 0; i < accountsData!.length; i++) {
			const { id, name, balance } = accountsData![i]
			accounts.push({
				id, name, balance , key: id
			})
		}


	return {
		accounts: accounts,
		records: records
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
			account_id: account,
			description: note,
			owner: locals.session?.user.id
		}).select("id, purpose, transaction_type, amount, account_id, date_time").limit(1).single()
		
		const response = await updateAccountOnCreate(locals.sb, parseInt(account), parseInt(amount), transaction_type)

		if (error) {
			return invalid(400, {message: error})
		}
		
		if (data) {
			const {id, purpose, transaction_type, amount, account_id, date_time} = data
			let createdRecord:recordType = {
				id, purpose, transaction_type, amount, account_id, date_time, key: id
			}
			return {data: createdRecord}
		}
	},

	deleteRecord: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const id = body.id as string
		const account = body.account as string
		const amount = body.amount as string
		const transaction_type = body.transaction_type as string

		console.log(account, amount, transaction_type)
		const { data, error } = await locals.sb.from("fin_records")
			.delete().eq("id", id)

		if (error) {
			return invalid(400, { message: error })
		}

		const response = await updateAccountOnDelete(locals.sb, parseInt(account), parseInt(amount), transaction_type)

		if (data) {
			return { data: data }
		}
	},
	
	editRecord: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const id = body.id as string
		const purpose = body.purpose as string
		const account = body.account as string
		const amount = body.amount as string
		const note = body.note as string
		const transaction_type = body.transaction_type as string

		const { data, error } = await locals.sb.from("fin_records")
			.update({
				amount: amount, 
				account_id: account, 
				description: note, 
				transaction_type: transaction_type, 
				purpose: purpose})
			.eq("id", id)
			.select("id, purpose, transaction_type, amount, account_id, date_time")
			.single()

		if (error) {
			return invalid(400, { message: error })
		}

		if (data) {
			return { data: data }
		}
	},

	deleteAccount: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const name = body.name as string

		const { data, error } = await locals.sb.from("fin_accounts")
			.delete().eq("name", name)

		if (error) {
			return invalid(400, { message: error })
		}

		if (data) {
			return { data: data }
		}
	},

	editAccount: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const name = body.name as string
		const newName = body.newName as string
		const balance = body.balance as string

		console.log(name)
		console.log(newName)
		console.log(balance)

		const { data, error } = await locals.sb.from("fin_accounts")
			.update({
				name: newName,
				balance: balance
			})
			.eq("name", name)
			.select("name, balance, id")
			.single()
		if (error) {
			return invalid(400, { message: error })
		}

		if (data) {
			return { data: data }
		}
	},



} satisfies Actions;