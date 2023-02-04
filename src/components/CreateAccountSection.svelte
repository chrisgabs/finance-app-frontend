<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import type { accountType } from "src/types/account.type";
    import { accounts } from "../stores/stores";

    const submitCreateAccount: SubmitFunction = ({ form, data, action, cancel }) => {

        // TODO: Client side form validation here
        // const { type, amount } = Object.fromEntries(data);
		// if (amount < 1) {
		// 	cancel();
		// }

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
                    console.log("succesful")
                    let createdAccount:accountType = result.data!.data
                    accounts.update((accounts) => {
                        accounts.push(createdAccount)
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

<div class="add-item flex justify-between space-x-4 outline outline-1 p-2">
    <form class="flex gap-2" use:enhance={submitCreateAccount} action="?/createAccount">
        <input type="text" class="outline outline-1 p-2" placeholder="Account name" name="account_name"/>
        <input type="text" class="outline outline-1 p-2" placeholder="Starting balance" name="starting_balance"/>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Icon description</span>
        </button>
    </form>
</div>