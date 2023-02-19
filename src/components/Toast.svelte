<script lang="ts">
  import { fade } from 'svelte/transition'
  import { notifications } from '../stores/notification'
</script>

{#if $notifications}
  <div class="flex flex-col fixed top-2 inset-x-2/4 gap-2 items-center mt-2 w-auto z-50">
    {#each $notifications as {message, status}}
      <div class="rounded-lg w-max shadow-xl p-2 px-3 bg-success" class:bg-success={status} class:bg-error={status == false}>
        <!-- <div class=""> -->
          {message}
        <!-- </div> -->
      </div>
    {/each}
  </div>
{/if}