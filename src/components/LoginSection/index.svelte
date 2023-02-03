<script lang="ts">
	import { enhance } from "$app/forms";
	import type { Session } from "@supabase/supabase-js";

    export let session:Session|null;
</script>

<!-- Html -->

<div class="my-auto flex flex-col gap-3">
    {#if session}
        <h1>Hello {session.user.user_metadata.first_name + " " + session.user.user_metadata.last_name}</h1>
    {/if}
    <form class="flex flex-col gap-2 mx-[100px]" method="POST" action="?/login" use:enhance>
        {#if session == null}
            <input class="outline outline-1 p-2" type="text" placeholder="email" name="email">
            <input class="outline outline-1 p-2" type="password" placeholder="password" name="password">
        {/if}
        <div class="flex justify-center gap-2">
            {#if session == null}
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                <button formaction="?/register" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register</button>
            {:else}
                <button formaction="?/logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            {/if}
        </div>
    </form>
</div>