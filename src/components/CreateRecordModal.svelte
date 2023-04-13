<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import type { recordType } from "../types/record.type";
    import { accounts, records } from "../stores/stores"
    import { toast } from '../stores/notification'
    import { updateAccountOnCreate } from "../lib/ledgerHandlerClient";


    let createRecordModalCheckbox: HTMLElement
    // createRecordModalCheckbox.click()

	let tabs = [
		"Income",
		"Expense",
		"Transfer",
	]
	let activeTab = 1

    let loading = false;

    let types:string[] = ["Food", "Transportation", "Other"]

    const submitCreateRecord: SubmitFunction = ({ form, data, action, cancel }) => {

        // TODO: Client side form validation here
        data.append("transaction_type", tabs[activeTab])
        const accountName = data.get("account")
        const accountId = $accounts.find((account) => account.name == accountName)?.id
        data.set("account", accountId!.toString())
        // const objects = Object.fromEntries(data);
        loading = true;

		return async ({ result, update }) => {
            loading = false;
			switch (result.type) {
				case 'success':
                    console.log("succesful")
                    let createdRecord:recordType = result.data!.data
                    createdRecord.account_name = accountName as string
                    console.log(createdRecord)
                    $records = [...$records, createdRecord]
                    // Update corresponding account
                    updateAccountOnCreate(accountId!, createdRecord.amount, createdRecord.transaction_type)
                    toast("records succesfully added", true)
                    break;
				case 'failure':
                    console.log("ERROR")
					console.log(result.data)
                    toast("error in adding record", false)
					break;
				default:
					break;
			}
			await update();
		};
	};


</script>

<input type="checkbox" id="create-record-modal" class="modal-toggle" bind:this={createRecordModalCheckbox}/>
<!-- Type, account, amount, description, date_time, cancel, add-->
<label class="modal z-40" for="create-record-modal">
    <label class="modal-box flex flex-col gap-4 items-center" for="">
        <h3 class="font-bold text-lg">Add Financial Record</h3>

        <form method="POST" action="?/createRecord" class="input-container flex flex-col gap-2" use:enhance={submitCreateRecord}>
            <div class="tabs tabs-boxed justify-center">
                {#each tabs as tab, index}
                    <button disabled={loading} type="button" class="tab tab-active" class:tab-active={activeTab == index && !loading} on:click={()=>activeTab = index}>{tab}</button>
                {/each}
            </div>

            <select disabled={loading} name="account" class="select select-bordered w-full max-w-xs">
                <option disabled selected>Account</option>
                {#each $accounts as acc (acc.key)}
                     <option>{acc.name}</option>
                {/each}
            </select>
            
            <input disabled={loading} type="text" name="amount" placeholder="Amount" class="input input-bordered w-full max-w-xs" />

            <select disabled={loading} name="purpose" class="select select-bordered w-full max-w-xs">
                <option disabled selected>Purpose</option>
                {#each types as type}
                     <option>{type}</option>
                {/each}
            </select>

            <textarea disabled={loading} name="note" class="textarea textarea-bordered" placeholder="Note"></textarea>

            <div class="modal-action my-0 mt-3 justify-center">
                <button type="button" on:click={() => createRecordModalCheckbox.click()} class="btn btn-error">Cancel</button>
                <button disabled={loading} class="btn btn-primary">Add Record</button>
            </div>
        </form>

    </label>
</label>
