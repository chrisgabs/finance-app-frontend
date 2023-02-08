<script lang="ts">
    import type { recordType } from "src/types/record.type";

    export let record: recordType ;

    let { id, transaction_type, purpose, account, amount, date_time } = record;
</script>

<div class="record-item flex justify-between items-center outline outline-1 p-2 mt-2">
    <div class="picture w-8 h-8 bg-slate-500"></div>
    <span>{purpose}</span>
    <span>{account}</span>
    <!-- why this redmarked by intellisense with autocomplete=off-->
    <span>{amount}</span>
    <span>{new Date(date_time).getMonth() + "/" + new Date(date_time).getDate()}</span>
</div>