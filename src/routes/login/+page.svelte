<script lang="ts">
import { goto } from '$app/navigation';
import { browser } from "$app/environment";

$: if (browser) {
    goto("/")
}

</script>

<h1>You need to login</h1>