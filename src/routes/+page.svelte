<script lang="ts">
    import Account from "../components/Account.svelte";
    import { records, accounts, user } from "../stores/stores"
    import Database from "../lib/Database"
    import  Record from "../components/Record.svelte";
    import { fade } from 'svelte/transition';

    // Props from server load
    // export let data:any;
    
    let type:string = "";
    let account:string = "";
    let amount:number = 0;
    let recordsLoading:boolean = true;
    let username:string = "";

    // Check if ssr still possible and if its the best decision
    Database.fetchRecords().then((res) => {
        records.set(res)
        recordsLoading = false;
    }).catch((err) => {
        console.log(err)
    })

    const handleSubmit = () => {
        let newRecord = {"_id": "", "type": type, "account": account, "amount": amount,"date": new Date()}
        Database.addRecord(newRecord).then((res) => {
            // Check if record is created
            if (res.record) {
                records.update((records) => {
                    records.push({
                        "_id" : res.record._id,
                        "type": type,
                        "account": account, 
                        "amount": amount,
                        "date": new Date()
                    })
                    return records
                })

            }else{
                console.log(res)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleLogin = () => {
        Database.fetchUserInformation(username).then((res) => {
            console.log("received:")
            console.log(res)
            user.set({
                "id": res._id,
                "name": res.name,
                "picture": res.picture
            });

            accounts.set(res.accounts);
            records.set(res.records);
        }).catch((err) => {
            console.log(err)
        })
    }
    
</script>

<!-- ---------------------------------- HTML ---------------------------------- -->

<div class="flex-col m-auto my-auto max-w-[500px]">

    <div class="flex-col justify-center column">
        {#if $user.id}
            <p>User: {$user.name}</p>
            <p>ID: {$user.id}</p>
        {/if}
    </div>

    <div class="flex justify-center">
        <input bind:value={username} type="text" name="username" id="username" placeholder="Username" class="outline outline-1 p-2 my-2">
        <!-- button for login -->
        <button type="button" class="my-auto ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            on:click={handleLogin}>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>

    <div class="accounts-container flex outline-1 outline p-2 space-x-2 overflow-auto no-scrollbar">
        {#each $accounts as account (account._id)}
            <Account account={account}/>
        {/each}
    </div>

    <!-- TODO: create own component -->
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

    {#if recordsLoading}
         <div class="Loading text-center" transition:fade>
             Loading Records
         </div>
    {/if}

    {#each $records as record (record._id)}
        <Record record={record}/>
    {/each}

</div>

<style>
    @tailwind components;

    @layer components {
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
    }
</style>