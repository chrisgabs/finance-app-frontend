<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import type { recordType } from "../types/record.type";
	import { onMount } from "svelte";
    import { accounts, records, selectedRecord } from "../stores/stores"
    import { toast } from '../stores/notification'
    import {get} from "../lib/api"
	import { updateAccountOnDelete } from "$lib/ledgerHandlerClient";

    let editRecordModalCheckbox: HTMLInputElement
    let accountsComboBox: HTMLSelectElement
    let purposeComboBox: HTMLSelectElement
    let notes: string
    let record_amount: number

    // id of record being selected
    let currentId: number;
    let loading = false;

	let tabs = [
		"Income",
		"Expense",
		"Transfer",
	]
	let activeTab = 1

    // account combobox
    let types:string[] = ["Food", "Transportation", "Other"]


    const submitEditRecord: SubmitFunction = ({ form, data, action, cancel }) => {

        loading = true;
        data.append("id", currentId.toString())
        // TODO: Client side form validation here
        data.append("transaction_type", tabs[activeTab])
        const accountId = $accounts.find((account) => account.name == data.get("account"))?.id
        data.set("account", accountId!.toString())
        
        if (action.search === "?/deleteRecord") {
            return async ({ result, update }) => {
                switch (result.type) {
                    case 'success':
                        records.update((records) => {
                            return records.filter((obj) => obj.id !== currentId);
                        })
                        console.log($selectedRecord)
                        updateAccountOnDelete($selectedRecord.account_id, $selectedRecord.amount, $selectedRecord.transaction_type)
                        toast("record succesfully deleted", true)
                        break;
                    case 'failure':
                        console.log("ERROR")
                        console.log(result.data)
                        toast("error in deleting record", false)
                        break;
                    default:
                        break;;
                }
                loading = false;
                editRecordModalCheckbox.click()
                await update();
		    };
        }

        // const objects = Object.fromEntries(data);

        // handle edit submit here
		return async ({ result, update }) => {
            loading = false;
			switch (result.type) {
				case 'success':
                    console.log("succesful")
                    let edittedRecord:recordType = result.data!.data
                    let newVals:recordType[];
                    records.edit(edittedRecord)
                    // console.log("new values:")
                    // console.log(newVals!)
                    // records.set(newVals!)
                    // $records = newVals!
                    toast("record succesfully editted", true)
                    break;
				case 'failure':
                    console.log("ERROR")
					console.log(result.data)
                    toast("error in editting record", false)
					break;
				default:
					break;
			}
			await update();
		};
	};

    const handleClick = () => {
        if (!editRecordModalCheckbox.checked) {
            return
        }
        
        loading = true;
        // may cause date previewed to be outdated if database is updated via 
        // other device/session
        if ($selectedRecord == undefined || $selectedRecord.id === currentId){
            console.log("selected record is same")
            loading = false
            return
        }
        currentId = $selectedRecord.id

        get(`records?id=${currentId}`).then(({data}) => {
            const {account_id, amount, date_time, description, purpose, transaction_type} = data
            
            activeTab = tabs.indexOf(transaction_type);
            accountsComboBox.value = $accounts.find((account) => account.id == account_id)?.name!
            purposeComboBox.value = purpose
            notes = description
            record_amount = amount
            $selectedRecord = {
                transaction_type,
                account_id,
                amount,
                id: currentId,
                key: currentId,
                purpose,
                date_time
            }

            loading = false;
        })
    }

</script>

<input type="checkbox" id="edit-record-modal" class="modal-toggle" bind:this={editRecordModalCheckbox} on:click={handleClick}/>
<!-- Type, account, amount, description, date_time, cancel, add-->
<label class="modal z-40" for="edit-record-modal">
    <label class="modal-box flex flex-col gap-4 items-center" for="">
        <h3 class="font-bold text-lg">Edit Financial Record</h3>

        <form method="POST" action="?/editRecord" class="input-container flex flex-col gap-2" use:enhance={submitEditRecord}>
            <div class="tabs tabs-boxed justify-center">
                {#each tabs as tab, index}
                    <button disabled={loading} type="button" class="tab tab-active" class:tab-active={activeTab == index && !loading} on:click={()=>activeTab = index}>{tab}</button>
                {/each}
            </div>

            <select bind:this={accountsComboBox} disabled={loading} name="account" class="select select-bordered w-full max-w-xs">
                <option disabled selected>Account</option>
                {#each $accounts as acc (acc.key)}
                     <option>{acc.name}</option>
                {/each}
            </select>
            
            <input bind:value={record_amount} disabled={loading} type="text" name="amount" placeholder="Amount" class="input input-bordered w-full max-w-xs" />

            <select bind:this={purposeComboBox} disabled={loading} name="purpose" class="select select-bordered w-full max-w-xs">
                <option disabled selected>Purpose</option>
                {#each types as type}
                     <option>{type}</option>
                {/each}
            </select>

            <textarea bind:value={notes} disabled={loading} name="note" class="textarea textarea-bordered" placeholder="Note"></textarea>

            <div class="flex-col modal-action my-0 mt-3 justify-center">
                <div class="flex justify-center gap-2">
                    <button type="button" on:click={() => editRecordModalCheckbox.click()} class="btn btn-error">Cancel</button>
                    <button disabled={loading} class="btn btn-primary">Update Record</button>
                </div>
                <button formAction="?/deleteRecord" disabled={loading} class="btn-link text-accent w-fit self-center text-sm mt-1">Detele Record</button>
            </div>

        </form>

    </label>
</label>
