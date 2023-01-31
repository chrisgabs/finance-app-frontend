<script lang="ts">
    import Account from "../components/Account.svelte";
    import { records, accounts, user } from "../stores/stores"
    import  Record from "../components/Record.svelte";
    import CreateRecordSection from "../components/CreateRecordSection.svelte";
    import { fade } from 'svelte/transition';
    import LoginSection from "../components/Auth/LoginSection.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { enhance } from "$app/forms";

    export let data: PageData;
    if (data.session) {
        console.log(data.session.user)
    }

    // Props from server load
    // export let data:any;
    
    let recordsLoading:boolean = true;

    onMount(() => {

    })

</script>

<!-- ---------------------------------- HTML ---------------------------------- -->

<div class="flex-col m-auto my-auto max-w-[500px]">

    <div class="my-auto flex flex-col gap-3">
        {#if data.session}
            <h1>Hello {data.session.user.user_metadata.first_name + " " + data.session.user.user_metadata.last_name}</h1>
        {/if}
        <form class="flex flex-col gap-2 mx-[100px]" method="POST" action="?/login" use:enhance>
            {#if !data.session}
                <input class="outline outline-1 p-2" type="text" placeholder="email" name="email">
                <input class="outline outline-1 p-2" type="password" placeholder="password" name="password">
            {/if}
            <div class="flex justify-center gap-2">
                {#if !data.session}
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                    <button formaction="?/register" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register</button>
                {:else}
                    <button formaction="?/logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
                {/if}
            </div>
        </form>
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