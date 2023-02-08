<script lang="ts">
	import type { accountType } from "src/types/account.type";


    export let account: accountType

    const {name, balance} = account
</script>

<div class="stat basis-48 truncate flex-none bg-sky-100">
    <div class="stat-title">{name}</div>
    <div class="stat-value overflow-clip text-xl">{balance.toLocaleString("en-US")}</div>
</div>