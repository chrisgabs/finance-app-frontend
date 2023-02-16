<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import type { accountType } from "src/types/account.type";
    import { accounts } from "../stores/stores"

    let createAccountCheckbox: HTMLElement
    // createAccountCheckbox.click()

    let accountNames:string[] = []
    $accounts.forEach(element => {
        accountNames.push(element.name)
    });

    const submitCreateAccount: SubmitFunction = ({ form, data, action, cancel }) => {

        // TODO: Client side form validation here
        // data.append("transaction_type", tabs[activeTab])
        // const objects = Object.fromEntries(data);

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
                    console.log("succesful")
                    let createdRecord:accountType = result.data!.data
                    accounts.update((accounts) => {
                        accounts.push(createdRecord)
                        return accounts
                    })
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


</script>

<input type="checkbox" id="create-account-modal" class="modal-toggle" bind:this={createAccountCheckbox}/>
<!-- Type, account, amount, description, date_time, cancel, add-->
<label class="modal" for="create-account-modal">
    <label class="modal-box flex flex-col gap-4 items-center" for="">
        <h3 class="font-bold text-lg">Add Account</h3>

        <form action="?/createAccount" class="input-container flex flex-col gap-2" use:enhance={submitCreateAccount}>
            
            <input type="text" name="name" id="name" placeholder="Account Name" class="input input-bordered w-full max-w-xs" />
            <input type="text" name="balance" id="balance" placeholder="Starting Balance" class="input input-bordered w-full max-w-xs" />

            <div class="modal-action my-0 mt-3 justify-center">
                <button type="button" on:click={() => createAccountCheckbox.click()} class="btn btn-error">Cancel</button>
                <button class="btn btn-primary">Add Account</button>
            </div>
        </form>

    </label>
</label>