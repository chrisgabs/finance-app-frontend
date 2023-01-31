<script lang="ts">
    import { records } from "../stores/stores";

    let type:string = "";
    let account:string = "";
    let amount:number = 0;

    const handleSubmit = () => {
        let newRecord = {"_id": "", "type": type, "account": account, "amount": amount,"date": new Date()}
        // Database.addRecord(newRecord).then((res) => {
        //     // Check if record is created
        //     if (res.record) {
        //         records.update((records) => {
        //             records.push({
        //                 "_id" : res.record._id,
        //                 "type": type,
        //                 "account": account, 
        //                 "amount": amount,
        //                 "date": new Date()
        //             })
        //             return records
        //         })

        //     }else{
        //         console.log(res)
        //     }
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
</script>

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