<script lang="ts">
	import type { accountType } from "src/types/account.type";
    import { selectedAccount } from "../stores/stores";


    export let account: accountType

    const {name, balance} = account

    const oneEditAccountModal = () => {
        console.log(account)
        selectedAccount.update((account) => {
            account.name = name
            account.balance = balance
            return account
        })
        document.getElementById("edit-account-modal")?.click()
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="stat basis-48 truncate flex-none bg-sky-100" on:click={oneEditAccountModal}>
    <div class="stat-title">{name}</div>
    <div class="stat-value overflow-clip text-xl">{balance.toLocaleString("en-US")}</div>
</div>