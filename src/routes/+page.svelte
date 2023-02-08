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
	import RecordRow from "./RecordRow.svelte";
	import NewRecordModal from "../components/CreateRecordModal.svelte";
    import NewAccountModal from "../components/CreateAccountModal.svelte"
	import AccountStat from "../components/AccountStat.svelte";

    export let data: PageData;
    let createRecordModalCheckbox: HTMLElement;
    let totalBalance:number;

    interface PageData {
        records: recordType[] | null,
        accounts: accountType[] | null,
        session: Session | null,
    }

    // if (data.records && data.accounts) {
    //     records.set(data.records)
    //     accounts.set(data.accounts)
    // }

    // if (data.session) {
    // }

    $: {
        totalBalance = $accounts.reduce((a, b) => a + b.balance, 0)
    }

    // let recordsLoading:boolean = true;

    onMount(() => {
        // api.get("accounts", "hatdog").then((res) => console.log(res))
    })

</script>

<!-- ---------------------------------- HTML ---------------------------------- -->
<!-- Type, account, amount, description, date_time, cancel, add-->
<NewRecordModal/>
<NewAccountModal/>

<!-- m-auto my-auto max-w-[500px] space-y-2 -->
<div class="flex-col max-w-[600px] mx-auto space-y-4">

    <div class="navbar bg-base-100 mt-4 shadow-xl rounded-box outline outline-2">
        <div class="flex-none">
            <button class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </div>
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">Finance-App</a>
        </div>
        <div class="navbar-end">
            <a class="btn">Login</a>
        </div>
    </div>
    
    <!-- <div class="divider"></div> -->

    <div class="rounded-box outline outline-2 flex justify-start overflow-x-auto p-1 no-scrollbar gap-1">
        <!-- TODOL Create own stat component -->
        <div class="stat basis-48 truncate flex-none bg-sky-100 rounded-bl-xl rounded-tl-xl">
            <div class="stat-title">TOTAL</div>
            <div class="stat-value overflow-clip text-base">{totalBalance.toLocaleString("en-US")}</div>
        </div>
        {#each $accounts as account (account.id)}
             <AccountStat account={account}/>
        {/each}
        <div class="stat items-center flex-none basis-16">
            <label for="create-account-modal" class="btn btn-outline shadow">+</label>
        </div>
    </div>

    <!-- <div class="divider"></div>  -->

    <div class="flex justify-between items-center mx-2">
        <span class="ml-2 text-xl font-semibold">Records</span>
        <label for="create-record-modal" class="btn btn-md btn-primary">add</label>
    </div>

    <!-- <span><h3>Records</h3></span> -->
    <!-- <h3>Records</h3> -->

    <table class="table w-full outline outline-2 rounded-lg mt-0">
        <!-- head -->
        <thead>
        <tr>
            <th></th>
            <th>Type</th>
            <th>Account</th>
            <th>Amount</th>
        </tr>
        </thead>
        <tbody>
            {#each $records as record (record.id)}
                <RecordRow record={record}/>
            {/each}
        </tbody>
    </table>

    <!-- <LoginSection session={data.session}/> -->

    <!-- <CreateAccountSection/> -->

    <!-- Accounts Section -->
    <!-- <div class="accounts-container flex outline-1 outline p-2 space-x-2 overflow-auto no-scrollbar">
        {#each $accounts as account (account.id)}
            <Account account={account}/>
        {/each}
    </div> -->

    <!-- <CreateRecordSection/> -->

    <!-- {#if recordsLoading}
         <div class="Loading text-center" transition:fade>
             Loading Records
         </div>
    {/if} -->

    <!-- {#each $records as record (record.id)}
        <Record record={record}/>
    {/each} -->

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