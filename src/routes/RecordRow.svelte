<script lang="ts">
	import type { recordType } from "src/types/record.type";

    export let record:recordType
    const {id, type, account, amount, date_time} = record
</script>

<tr class="hover">
    <th>{id}</th>
    <td>{type}</td>
    <td>{account}</td>
    <td>{amount}</td>
</tr>