<script lang="ts">
    let show = false;
    export let id:string;
</script>

<div class="flex justify-center">
    <div class="relative">
        <button on:click={() => show = !show} class="relative z-10 block focus:outline-none">
            <svg class="h-4 w-4 text-gray-700 hover:text-gray-900" viewBox="-45 0 125 125" fill="currentColor">
                <!-- <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /> -->
                <path fill-rule="evenodd" d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z" clip-rule="evenodd" />
            </svg>
        </button>

        <div class:show={show} class:hide={!show}>
            <a href="#" class="block px-4 text-sm capitalize text-gray-700 hover:bg-slate-100">
                edit
            </a>
            <a href="#" class="block px-4 text-sm capitalize text-gray-700 hover:bg-slate-100">
                delete
            </a>
        </div>
    </div>
</div>

<style>
    @tailwind components;

    @layer components {
        .show {
            @apply absolute top-5 right-0 w-fit bg-white rounded-md shadow-xl z-20 py-1
        }

        .hide {
            @apply hidden
        }
    }
</style>