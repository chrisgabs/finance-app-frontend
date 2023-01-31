<script lang="ts">
    import { records, accounts, user } from "../../stores/stores"

    let username:string = "";

    // const handleLogin = async () => {
    //     await fetch("http://localhost:9090/auth/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //         body: JSON.stringify({
    //             "id": username
    //         })
    //     }).then((res) => {
    //         console.log(res)
    //         if (res.status === 200) {
    //             Database.fetchUserInformation(username).then((res) => {
    //                 console.log("received:")
    //                 console.log(res)
    //                 user.set({
    //                     "id": res._id,
    //                     "name": res.name,
    //                     "picture": res.picture
    //                 });

    //                 accounts.set(res.accounts);
    //                 records.set(res.records);
    //             }).catch((err) => {
    //                 console.log(err)
    //             })
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    // const handleLogout = async () => {
    //     await fetch("http://localhost:9090/auth/logout", {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include"
    //     }).then((res) => {
    //         console.log(res)
    //         if (res.status === 200) {
    //             user.set({
    //                 "id": "",
    //                 "name": "",
    //                 "picture": ""
    //             });
    //             accounts.set([]);
    //             records.set([]);
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }
</script>

<!-- Html -->

<div class="flex justify-center">
    <input bind:value={username} type="text" name="username" id="username" placeholder="Username" class="outline outline-1 p-2 my-2">
    <!-- button for login -->
    <button type="button" class="my-auto ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    <!-- button for logout -->
    <button type="button" class="my-auto ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
</div>