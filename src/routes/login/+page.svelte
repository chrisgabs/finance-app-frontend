<script lang="ts">
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '$app/forms';

    let loginContainer: HTMLElement;
    let login:boolean = true;
    let invalidCreds = false;
    let passwordMatching = true;
    let emailValid = true;
    let validPassword = true;
    
    const scrollToLoginContainer = () => {
        loginContainer.scrollIntoView({behavior: "smooth", block:"end"});
    }

    const resetValidators = () => {
        invalidCreds = false;
        passwordMatching = true;
        emailValid = true;
        validPassword = true;
    }

    const loginEnhancement: SubmitFunction = ({ form, data, action, cancel }) => {

        resetValidators()
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        if (action.search == "?/register") {
            const confirmPassword = data.get('confirm-password');
    
            // Check for valid email format
            const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
            console.log(emailRegex.test(email))
            if (!emailRegex.test(email)) {
                emailValid = false;
                return cancel();
            }
    
            // Check if password and confirm password match
            if (password.length < 6) {
                validPassword = false;
                return cancel()
            }
            if (password !== confirmPassword) {
                passwordMatching = false;
                return cancel();
            }
        } else if (action.search == "?/login") {
            console.log("login checking")
            if (email == "" || password == "") {
                invalidCreds = true;
                return cancel();
            }
        }

        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    invalidCreds = false;
                    break;
                case 'failure':
                    invalidCreds = true;
                    console.log(result.data!.error)
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
		<form method="POST" class="bg-white p-10 outline outline-1 rounded-md outline-neutral/25" use:enhance={loginEnhancement}>
			<h1 class="text-gray-800 font-bold text-2xl text-center mb-4">
                {login ? 'Login' : 'Register'}
            </h1>
            {#if invalidCreds}
                <p class="text-sm font-bold text-error text-center">Wrong Credentials</p>
                <p class="text-sm font-normal text-error mb-2 text-center">invalid email or password</p>
            {/if}
            {#if !passwordMatching || !emailValid || !validPassword}
                <p class="text-sm font-bold text-error text-center">Invalid Input</p>

                {#if !passwordMatching}
                    <p class="text-sm font-normal text-error text-center">passwords should match</p>
                {/if}
                {#if !emailValid}
                    <p class="text-sm font-normal text-error text-center">email must be valid</p>
                {/if}
                {#if !validPassword}
                    <p class="text-sm font-normal text-error text-center">password must be at least 6 characters long</p>
                {/if}
            {/if}
            <!-- <div class="divider my-1"></div> -->

            <!-- email -->
            <div class="flex items-center border-[1px] border-current/90 py-2 px-3 rounded-2xl mb-4 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input class="pl-2 outline-none border-none" type="text" name="email" id="email" placeholder="Email Address" />
            </div>

            <!-- password -->
            <div class="flex items-center border-[1px] py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd" />
                </svg>
                <input class="pl-2 outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
            </div>

            <!-- confirm password -->
            {#if !login}
                <div class="flex items-center border-[1px] py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd" />
                    </svg>
                    <input class="pl-2 outline-none border-none" type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />
                </div>
            {/if}

            <!-- <div class="divider my-1"></div> -->

            <button formaction={login ? '?/login' : '?/register'} class="block w-full bg-indigo-600 py-2 px-3 hover:bg-neutral transition rounded-2xl text-white font-semibold mb-2">
                {login ? 'Login' : 'Create Account'}
            </button>
            <div class="flex justify-between">
                <button on:click={(e) => {e.preventDefault(); login = !login; resetValidators()}} class="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                    {login ? 'Register' : 'Login'}
                </button>
                <button disabled class="text-sm ml-2 text-gray-400">Forgot Password?</button>
            </div>
		</form>

	</div>

</div>