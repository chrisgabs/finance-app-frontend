<script lang="ts">
    import type { recordType } from "src/types/record.type";
    import Dropdown from "./Dropdown.svelte";

    export let record: recordType ;

    let { id, type, account, amount, date_time } = record;
</script>

<div class="record-item flex justify-between items-center outline outline-1 p-2 mt-2">
    <div class="picture w-8 h-8 bg-slate-500"></div>
    <span>{type}</span>
    <span>{account}</span>
    <!-- why this redmarked by intellisense with autocomplete=off-->
    <span>{amount}</span>
    <span>{new Date(date_time).getMonth() + "/" + new Date(date_time).getDate()}</span>
    <Dropdown id={id}></Dropdown>
</div>