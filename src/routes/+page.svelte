<script lang="ts">
    import Account from "../components/Account.svelte";
    import { records, accounts, user } from "../stores/stores"
    import Database from "../lib/Database"
    import  Record from "../components/Record.svelte";
    import CreateRecordSection from "../components/CreateRecordSection.svelte";
    import { fade } from 'svelte/transition';
    import LoginSection from "../components/LoginSection.svelte";

    // Props from server load
    // export let data:any;
    
    let recordsLoading:boolean = true;

</script>

<!-- ---------------------------------- HTML ---------------------------------- -->

<div class="flex-col m-auto my-auto max-w-[500px]">

    <div class="flex-col justify-center column">
        {#if $user.id}
            <p>User: {$user.name}</p>
            <p>ID: {$user.id}</p>
        {/if}
    </div>

    <LoginSection/>

    <!-- Accounts Section -->
    <div class="accounts-container flex outline-1 outline p-2 space-x-2 overflow-auto no-scrollbar">
        {#each $accounts as account (account._id)}
            <Account account={account}/>
        {/each}
    </div>

    <CreateRecordSection/>

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