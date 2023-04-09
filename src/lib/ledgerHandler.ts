import type { SupabaseClient } from "@supabase/supabase-js";

// utilize rpc
export async function updateAccountOnCreate(db: SupabaseClient, account_id: number, amount: number, transaction_type: string) {
    if (transaction_type == "Income") {
        await db.rpc("increment_balance", { acc_id: account_id, amount: amount })
    } else if (transaction_type == "Expense") {
        await db.rpc("decrement_balance", { acc_id: account_id, amount: amount })
    }
}

export async function updateAccountOnDelete(db: SupabaseClient, account_id: number, amount: number, transaction_type: string) {
    console.log("updateAccountOnDelete SERVER called");
    
    if (transaction_type == "Expense") {
        await db.rpc("increment_balance", { acc_id: account_id, amount: amount })
    } else if (transaction_type == "Income") {
        await db.rpc("decrement_balance", { acc_id: account_id, amount: amount })
    }
}