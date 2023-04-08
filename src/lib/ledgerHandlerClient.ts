import type { recordType } from "src/types/record.type";
import { accounts, records } from "../stores/stores"

export const updateAccountOnCreate = (account_id: number, amount: number, transaction_type: string) => {
    accounts.update((accounts) => {
        console.log("updatedAccountOnCreate called")
        for (let acc of accounts) {
            if (acc.id == account_id) {
                if (transaction_type == "Expense") {
                    acc.balance = acc.balance - amount
                }else {
                    acc.balance = acc.balance + amount
                }
                acc.key = Math.random() * 100_000_000;
            }
        }
        return accounts
    })
}

export const updateAccountOnDelete = (account_id: number, amount: number, transaction_type: string) => {
    console.log("updateAccountOnDelete called")
    accounts.update((accounts) => {
        for (let acc of accounts) {
            if (acc.id == account_id) {
                if (transaction_type == "Expense") {
                    acc.balance = acc.balance + amount
                } else {
                    acc.balance = acc.balance - amount
                }
                acc.key = Math.random() * 100_000_000;
            }
        }
        return accounts
    })
}