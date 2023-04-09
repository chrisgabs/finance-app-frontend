<script lang="ts">
import { goto } from '$app/navigation';
import { browser } from "$app/environment";
import { enhance } from '$app/forms';
import type { SubmitFunction } from '$app/forms';

let loginContainer: HTMLElement;

const scrollToLoginContainer = () => {
    loginContainer.scrollIntoView({behavior: "smooth", block:"end"});
}

const loginEnhancement: SubmitFunction = ({ form, data, action, cancel }) => {

    // TODO: Client side form validation here
    // data.append("transaction_type", tabs[activeTab])
    // const objects = Object.fromEntries(data);

    return async ({ result, update }) => {
        switch (result.type) {
            case 'success':
                console.log("succesful")
                console.log(result)
                break;
            case 'invalid':
                console.log("ERROR")
                console.log(result.data)
                break;
            default:
                break;
        }
        await update();
    };

};


</script>

<div class=" md:flex">
    <!-- left side -->
    <div
		class="relative overflow-hidden md:flex md:w-2/3 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center min-h-screen w-full flex">
		<div class="p-6">
			<h1 class="text-white font-bold text-4xl font-sans">Finance-app</h1>
			<p class="text-white mt-1">Manage your finances by keeping track of your income and expenses.</p>
			<button on:click={() => scrollToLoginContainer()} class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Start Now</button>
		</div>
		<div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
	</div>

    <!-- right side -->
	<div class="flex md:w-1/3 justify-center py-10 items-center bg-white" bind:this={loginContainer}>

        <!-- login form -->
		<form class="bg-white outline outline-2 p-12 rounded-box" use:enhance={loginEnhancement}>
			<h1 class="text-gray-800 font-bold text-2xl mb-1">Welcome!</h1>
			<p class="text-sm font-normal text-gray-600 mb-7">Log in or register</p>

            <!-- email -->
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input class="pl-2 outline-none border-none" type="text" name="email" id="email" placeholder="Email Address" />
            </div>

            <!-- password -->
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd" />
                </svg>
                <input class="pl-2 outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
            </div>

            <button formaction="?/login" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
            <div class="flex justify-between">
                <button formaction="?/register" class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Register</button>
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
            </div>
		</form>

	</div>

</div>