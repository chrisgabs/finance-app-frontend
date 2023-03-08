<script lang="ts">
	import type { recordType } from "src/types/record.type";
    import { selectedRecord } from "../stores/stores";

    // export let editModal:HTMLElement;
    export let record:recordType
    const {id, purpose, account_name, amount, date_time} = record

    const openEditRecordModal = () => {
        selectedRecord.update((record) => {
            record.id = id
            return record
        })
        document.getElementById("edit-record-modal")?.click()
    }
</script>

<tr class="hover" on:click={openEditRecordModal}>
    <th>{id}</th>
    <td>{purpose}</td>
    <td>{account_name}</td>
    <td>{amount}</td>
</tr>