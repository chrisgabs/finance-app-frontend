<script lang="ts">
    import type { accountType } from "src/types/account.type";

    export let account: accountType
</script>

<div class="accounts outline outline-1 rounded-sm">
    <div class="account bg-slate-100 w-[100px] truncate p-1">
        <div class="account_name">{account.name}</div>
        <div class="account_balance">{account.amount}</div>
    </div>
</div>

