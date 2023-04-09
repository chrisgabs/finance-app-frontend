<script lang="ts">
    import "../app.css";
    import { supabase } from '$lib/supabaseClient'
    import { invalidateAll } from '$app/navigation'
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
	import type { Session } from "@supabase/supabase-js";
	import Toast from "../components/Toast.svelte";

  let session:Session|null = null;
  onMount(async () => {
      // get the current session
      const {data} = await supabase.auth.getSession();
      session = data.session;
      console.log("layout |", session)

      // refresh: we did this when user is login with a provider (e.g google)
      if (session && $page.data.session == null) {
          await invalidateAll();
          // location.reload();
      }

      // supabase auth listener
      const {
          data: {
              subscription
          }
      } = supabase.auth.onAuthStateChange((event, new_session) => {
          console.log("auth state changed")
          /*
            We did this condition cuz of this 'onAuthStateChange' function is triggered
            Whenever the user changes the browser tab!
            So - we do not do anything if the session is not changed!
          */
          if (session?.access_token != new_session?.access_token) {
              console.log('session changed');
              session = new_session;

              // reload all routes depends on supabase session
              // invalidate('supabase:auth');
              invalidateAll()
              if (event == 'SIGNED_IN') {
                console.log("actually signed in")
                  // Do what you want here
              }
          }
      });
      return () => {
          subscription.unsubscribe();
      };
  });

  // onMount(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange(async (event, session) => {
  //     console.log("auth event triggered:");
  //     console.log("session:");
  //     console.log(session)
  //     console.log("event");
  //     console.log(event)
  //     console.log("subscription");
  //     console.log(subscription)
  //     invalidateAll()
  //   })

  //   return () => {
  //     subscription.unsubscribe()
  //   }
  // })
</script>

<!-- <div class=""> -->
<Toast/>
<slot />
<!-- </div> -->