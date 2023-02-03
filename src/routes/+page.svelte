<script lang="ts">
    import Account from "../components/Account.svelte";
    import { records, accounts } from "../stores/stores"
    import  Record from "../components/Record.svelte";
    import CreateRecordSection from "../components/CreateRecordSection.svelte";
    import LoginSection from "../components/LoginSection/index.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
    import * as api from '$lib/api';
	import CreateAccountSection from "../components/CreateAccountSection.svelte";
	import type { recordType } from "src/types/record.type";
	import type { accountType } from "src/types/account.type";
	import type { Session } from "@supabase/supabase-js";

    export let data: PageData;

    interface PageData {
        records: recordType[] | null,
        accounts: accountType[] | null,
        session: Session | null,
    }

    if (data.session) {
        console.log(data.records)
        console.log(data.accounts)
        
        if (data.records && data.accounts) {
            records.set(data.records)
            accounts.set(data.accounts)
        }
    }

    // let recordsLoading:boolean = true;

    onMount(() => {
        api.get("accounts", "hatdog").then((res) => console.log(res))
    })

</script>

<!-- ---------------------------------- HTML ---------------------------------- -->

<div class="flex-col m-auto my-auto max-w-[500px] space-y-2">

    <LoginSection session={data.session}/>

    <CreateAccountSection/>

    <!-- Accounts Section -->
    <div class="accounts-container flex outline-1 outline p-2 space-x-2 overflow-auto no-scrollbar">
        {#each $accounts as account (account._id)}
            <Account account={account}/>
        {/each}
    </div>

    <CreateRecordSection/>

    <!-- {#if recordsLoading}
         <div class="Loading text-center" transition:fade>
             Loading Records
         </div>
    {/if} -->

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