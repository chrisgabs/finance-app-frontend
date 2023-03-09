<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import type { accountType } from "src/types/account.type";
	import { accounts, selectedAccount, records } from "../stores/stores"
	import {get as getAPI} from "../lib/api"
	import { get } from 'svelte/store';
    import { toast } from '../stores/notification'
	import Account from "./Account.svelte";

	let editAccountCheckbox: HTMLInputElement
	// editAccountCheckbox.click()

	let loading = false;
	let selectedAccountName:string = "-"


	const submitEditAccount: SubmitFunction = ({ form, data, action, cancel }) => {
		loading = true;
		// TODO: Client side form validation here
		data.append("name", selectedAccountName)

        if (action.search === "?/deleteAccount") {
            return async ({ result, update }) => {
                switch (result.type) {
                    case 'success':
                        records.update((records) => {
                            return records.filter((obj) => obj.account_name !== selectedAccountName);
                        })
						accounts.update((accounts) => {
                            return accounts.filter((obj) => obj.name !== selectedAccountName);
						})
                        toast("account succesfully deleted", true)
                        break;
                    case 'invalid':
                        console.log("ERROR")
                        console.log(result.data)
                        toast("error in deleting account", false)
                        break;
                    default:
                        break;;
                }
                loading = false;
                editAccountCheckbox.click()
                await update();
		    };
        }

		return async ({ result, update }) => {
			loading = false;
			switch (result.type) {
				case 'success':
					console.log("succesful")
					let edittedAccount:accountType = result.data!.data
					accounts.edit(edittedAccount)
					console.log(edittedAccount)
					break;
				case 'invalid':
					console.log("ERROR")
					console.log(result.data)
					break;
				default:
					break;
			}
			await update();
		};
	};

	const handleClick = () => {
		if (!editAccountCheckbox.checked) {
			return
		}

		selectedAccountName = get(selectedAccount).name
		loading = true;
		// may cause date previewed to be outdated if database is updated via 
		// other device/session
		if ($selectedAccount == undefined || $selectedAccount.name === selectedAccountName){
			console.log("selected record is same")
			loading = false
			return
		}
		// selectedAccountName = $selectedAccount.name

		getAPI(`accounts?name=${selectedAccountName}`).then(({data}) => {
			selectedAccount.update((account) => {
				account.balance = data.balance
				return account
			})
			loading = false;
		})
	}

</script>

<input type="checkbox" id="edit-account-modal" class="modal-toggle" bind:this={editAccountCheckbox} on:click={handleClick}/>
<!-- Type, account, amount, description, date_time, cancel, add-->
<label class="modal z-40" for="edit-account-modal">
    <label class="modal-box flex flex-col gap-4 items-center" for="">
        <h3 class="font-bold text-lg">Edit Financial Account</h3>

        <form action="?/editAccount" class="input-container flex flex-col gap-2" use:enhance={submitEditAccount}>
            
            <input bind:value={$selectedAccount.name} disabled={loading} type="text" name="newName" id="edit-account-name" placeholder="Account Name" class="input input-bordered w-full max-w-xs" />
            <input bind:value={$selectedAccount.balance} disabled={loading} type="text" name="balance" id="edit-account-balance" placeholder="Starting Balance" class="input input-bordered w-full max-w-xs" />

            <div class="flex-col modal-action my-0 mt-3 justify-center">
                <div class="flex justify-center gap-2">
                  <button type="button" on:click={() => editAccountCheckbox.click()} class="btn btn-error">Cancel</button>
                  <button disabled={loading} class="btn btn-primary">Edit Account</button>
                </div>
                <button formAction="?/deleteAccount" disabled={loading} class="btn-link text-accent w-fit self-center text-sm mt-1">Detele Record</button>
            </div>
        </form>

    </label>
</label>