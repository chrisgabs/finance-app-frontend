import type { Actions, PageServerLoad } from "./$types";
import type { recordType } from "../types/record.type";
import type { accountType } from "../types/account.type";
import { error, redirect } from '@sveltejs/kit';
import { updateAccountOnCreate, updateAccountOnDelete } from "../lib/ledgerHandler";

export const load: PageServerLoad = async ({ parent, locals:{supabase} }) => {
    const { session } = await parent();
    if (!session) {
        return {
            accounts: [],
            records: []
        }
    }


    // console.log("THERE IS A SESSION SERVER SIDE")
    // Get accounts and records from database
	const receivedData = await supabase.from("fin_accounts").select("id, name, balance")
	const receivedRecords = await supabase.from("fin_records")
        .select("id, purpose, amount, account_id, date_time, transaction_type")
        .order("date_time", { ascending: false })


    // Check for errors
    if (receivedData.error) {
        console.log("error")
        console.log(receivedData.error);
    } else if (receivedRecords.error) {
        console.log(receivedRecords.error);
    }

    // Records PostgresReponse to Array
    let records: recordType[] = []
    let recordsData = receivedRecords.data
    let accounts: accountType[] = []
    let accountsData = receivedData.data

    for (let i = 0; i < recordsData!.length; i++) {
        const { id, purpose, amount, account_id, date_time, transaction_type } = recordsData![i]
        // Get account names associated with record
        const account_name = accountsData!.find((record) => record.id == account_id)?.name
        records.push({
            id, purpose, amount, account_id, date_time, transaction_type, key: id, account_name
        })
    }

    for (let i = 0; i < accountsData!.length; i++) {
        const { id, name, balance } = accountsData![i]
        accounts.push({
            id, name, balance, key: id
        })
    }


    return {
        accounts: accounts,
        records: records
    };
};

export const actions: Actions = {

    logout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut();
        throw redirect(303, '/login');
    },

	// ----------------- Records CRUD -----------------

	createRecord: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession()
		const body = Object.fromEntries(await request.formData());
		const purpose = body.purpose as string
		const account = body.account as unknown as number
		const amount = body.amount as unknown as number
		const note = body.note as string
		const transaction_type = body.transaction_type as string

		const { data, error } = await supabase.from("fin_records").insert({
			purpose: purpose,
			transaction_type: transaction_type,
			amount: amount,
			date_time: new Date() as unknown as string,
			account_id: account,
			description: note,
			owner: session!.user.id
		}).select("id, purpose, transaction_type, amount, account_id, date_time").limit(1).single()

		updateAccountOnCreate(supabase, account, amount, transaction_type)

		if (error) {
			return { message: error }
		}

		if (data) {
			const { id, purpose, transaction_type, amount, account_id, date_time } = data
			let createdRecord: recordType = {
				id, purpose, transaction_type, amount, account_id, date_time, key: id
			}
			return { data: createdRecord }
		}
	},

	deleteRecord: async ({ request, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());
		const id = body.id as string
		const account = body.account as string
		const amount = body.amount as string
		const transaction_type = body.transaction_type as string

		console.log(account, amount, transaction_type)
		const { data, error } = await supabase.from("fin_records")
			.delete().eq("id", id)

		if (error) {
			return { message: error }
		}

		const response = await updateAccountOnDelete(supabase, parseInt(account), parseInt(amount), transaction_type)

		if (data) {
			return { data: data }
		}
	},

	editRecord: async ({ request, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());
		const id = body.id as string
		const purpose = body.purpose as string
		const account = body.account as unknown as number
		const amount = body.amount as unknown as number
		const note = body.note as string
		const transaction_type = body.transaction_type as string

		const { data, error } = await supabase.from("fin_records")
			.update({
				amount: amount,
				account_id: account,
				description: note,
				transaction_type: transaction_type,
				purpose: purpose
			})
			.eq("id", id)
			.select("id, purpose, transaction_type, amount, account_id, date_time")
			.single()

		if (error) {
			return { message: error }
		}

		if (data) {
			return { data: data }
		}
	},

	// ----------------- Account CRUD -----------------

	createAccount: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession()
		const body = Object.fromEntries(await request.formData());
		const name = body.name as string
		const balance = body.balance as unknown as number
		console.log(name, balance)
		const { data, error } = await supabase.from("fin_accounts").insert({
			name: name,
			balance: balance,
			owner: session?.user.id
		}).select("id, name, balance").limit(1).single()

		if (error) {
			return { message: error }
		}

		if (data) {
			return { data: data }
		}
	},

	deleteAccount: async ({ request, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());
		const name = body.name as string

		const { data, error } = await supabase.from("fin_accounts")
			.delete().eq("name", name)

		if (error) {
			return { message: error }
		}

		if (data) {
			return { data: data }
		}
	},

	editAccount: async ({ request, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());
		const name = body.name as string
		const newName = body.newName as string
		const balance = body.balance as unknown as number

		console.log(name)
		console.log(newName)
		console.log(balance)

		const { data, error } = await supabase.from("fin_accounts")
			.update({
				name: newName,
				balance: balance
			})
			.eq("name", name)
			.select("name, balance, id")
			.single()
		if (error) {
			return { message: error }
		}

		if (data) {
			return { data: data }
		}
	},


}