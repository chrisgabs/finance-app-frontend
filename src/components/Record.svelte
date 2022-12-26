<script lang="ts">
    import type { recordType } from "src/types/record.type";
    import Dropdown from "./Dropdown.svelte";

    export let record: recordType ;

    let { _id, type, account, amount, date } = record;
</script>

<div class="record-item flex justify-between items-center outline outline-1 p-2 mt-2">
    <div class="picture w-8 h-8 bg-slate-500"></div>
    <span>{type}</span>
    <span>{account}</span>
    <span autocomplete="off">{amount}</span>
    <span>{new Date(date).getMonth() + "/" + new Date(date).getDate()}</span>
    <Dropdown id={_id}></Dropdown>
</div>