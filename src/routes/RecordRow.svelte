<script lang="ts">
	import type { recordType } from "src/types/record.type";

    export let record:recordType
    const {id, purpose, account, amount, date_time} = record
</script>

<tr class="hover">
    <th>{id}</th>
    <td>{purpose}</td>
    <td>{account}</td>
    <td>{amount}</td>
</tr>