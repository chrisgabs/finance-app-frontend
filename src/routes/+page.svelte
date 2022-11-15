<script>

</script>

<div class="flex bg-slate-500 h-screen m-0 align-center">

    <div class="flex-col m-auto my-auto">

        <div class="accounts outline outline-1 p-2">
            <div class="account bg-slate-400 w-fit">
                <div class="account_name">Account 1</div>
                <div class="account_balance">Balance: $100</div>
            </div>
        </div>

        <div class="add-item flex justify-between space-x-4 outline outline-1 p-2 mt-2">
            <select name="type" id="type" class="">
                <option value="Food">Text</option>
                <option value="Trasnportation">Image</option>
                <option value="Others">Video</option>
            </select>
            <select name="account" id="account" class="">
                <option value="Gcash">Gcash</option>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
            </select>
            <input type="text" name="amount" id="amount" class="" placeholder="Amount">
            <input type="button" value="Add" class="add-button outline outline-1">
        </div>
        
        <div class="records-container mt-2">
            <div class="record-item flex justify-between items-center outline outline-1 p-2">
                <div class="picture w-8 h-8 bg-white"></div>
                <span>Type</span>
                <span autocomplete="off">Amount</span>
                <span>Date</span>
            </div>
        </div>

    </div>

</div>