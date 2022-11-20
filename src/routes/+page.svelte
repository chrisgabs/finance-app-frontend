<script lang="ts">
    import type { record } from "src/types/record.type";
    import { records } from "../stores/stores"
    export let data:any;

    let type:string = "";
    let account:string = "";
    let amount:number = 0;

    const handleSubmit = () => {
        let date = new Date();
        records.update((records) => {
            records.push({
                type,
                account,
                amount,
                date
            })
            return records
        })
    }

    $: {
        records.set(data.records)
        console.log($records)
    }
</script>

<div class="flex-col m-auto my-auto">

    <div class="accounts outline outline-1 p-2">
        <div class="account bg-slate-400 w-fit">
            <div class="account_name">Account 1</div>
            <div class="account_balance">Balance: $100</div>
        </div>
    </div>

    <div class="add-item flex justify-between space-x-4 outline outline-1 p-2 my-2">
        <select name="type" id="type" class="" bind:value={type}>
            <option value="Food">Food</option>
            <option value="Trasnportation">Trasnportation</option>
            <option value="Others">Others</option>
        </select>
        <select name="account" id="account" class="" bind:value={account}>
            <option value="Gcash">Gcash</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
        </select>
        <input type="text" name="amount" id="amount" class="" placeholder="Amount" bind:value={amount}>
        <button on:click={handleSubmit} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Icon description</span>
        </button>
    </div>

    {#each $records as {type, date, amount, account}}
        <div class="record-item flex justify-between items-center outline outline-1 p-2">
            <div class="picture w-8 h-8 bg-white"></div>
            <span>{type}</span>
            <span autocomplete="off">{amount}</span>
            <span>{new Date(date).getMonth() + "/" + new Date(date).getDate()}</span>
            <button class="w-8 h-8 outline outline-1">asd</button>
        </div>
    {/each}

</div>
