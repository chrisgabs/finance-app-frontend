import { writable, type Writable } from 'svelte/store';
import type { accountType } from '../types/account.type';
import type { recordType } from "../types/record.type";
import type { userType } from '../types/user.type';

// export const records = writable<recordType[]>([
//     { id: 1, transaction_type: "Expense", purpose: 'Trasnportation', account: 'Unionbank', amount: 1000, date_time: new Date("2022-03-01"), key:1},
//     { id: 2, transaction_type: "Expense", purpose: 'Food', account: 'BPI', amount: 100000, date_time: new Date("2022-03-01"), key: 2},
//     { id: 3, transaction_type: "Expense", purpose: 'Communication', account: 'Cash', amount: 2000, date_time: new Date("2022-03-01"), key: 3},
//     { id: 4, transaction_type: "Expense", purpose: 'Others', account: 'bank', amount: 1234, date_time: new Date("2022-03-01"), key: 4},
//     { id: 5, transaction_type: "Expense", purpose: 'Others', account: 'bank', amount: 5, date_time: new Date("2022-03-01"), key: 5},
//     { id: 6, transaction_type: "Expense", purpose: 'Others', account: 'bank', amount: 2000, date_time: new Date("2022-03-01"), key: 6},
// ]);

export const selectedRecord = writable<recordType>({
    id: -1, transaction_type: "", purpose: "", account_name: "", amount: -1, date_time: new Date(), key: 3, account_id: -1
})

export const selectedAccount = writable<accountType>({
    id: -1, name: '', balance: -1, key:-1
})
// export const user = writable<userType>({
//     id: '',
//     name: '',
// });

function createRecord() {
    const { subscribe, set, update } = writable<recordType[]>([
        { id: 1, transaction_type: "Expense", purpose: 'Trasnportation', account_name: 'Unionbank', amount: 1000, date_time: new Date("2022-03-01"), key: 1, account_id: 2},
        { id: 2, transaction_type: "Expense", purpose: 'Food', account_name: 'BPI', amount: 100000, date_time: new Date("2022-03-01"), key: 2, account_id: 1 },
        { id: 3, transaction_type: "Expense", purpose: 'Communication', account_name: 'Cash', amount: 2000, date_time: new Date("2022-03-01"), key: 3, account_id: 3 },
        { id: 4, transaction_type: "Expense", purpose: 'Others', account_name: 'bank', amount: 1234, date_time: new Date("2022-03-01"), key: 4, account_id: 4 },
        { id: 5, transaction_type: "Expense", purpose: 'Others', account_name: 'bank', amount: 5, date_time: new Date("2022-03-01"), key: 5, account_id: 5 },
        { id: 6, transaction_type: "Expense", purpose: 'Others', account_name: 'bank', amount: 2000, date_time: new Date("2022-03-01"), key: 6, account_id: 6 },
    ]);

    return {
        subscribe,
        
        // implement updateAccountName(), use same logic with edit()

        edit: (recordToEdit: recordType) => update((records) => {
            for (let i = 0; i < records.length; i++) {
                if (records[i].id == recordToEdit.id) {
                    let newRecord: recordType = {
                        id: recordToEdit.id,
                        account_name: recordToEdit.account_name,
                        amount: recordToEdit.amount,
                        date_time: recordToEdit.date_time,
                        purpose: recordToEdit.purpose,
                        transaction_type: recordToEdit.transaction_type,
                        account_id: recordToEdit.account_id,
                        key: generateUniqueKey()
                    }
                    records[i] = newRecord
                    break;
                }
            }
            return records
        }),

        update,
        set

        // generateKeys: () => {
        //     update((records) => {
        //         for (let i = 0; i < records.length; i++) {
        //             records[i].key
        //         }
        //         return records
        //     })
        // }
    };
}

function createAccount() {
    const { subscribe, set, update } = writable<accountType[]>([
        { id: 1, name: 'Gcash', balance: 500_00, key: 1 },
        { id: 2, name: 'Cash', balance: 800_000, key: 2 },
        { id: 3, name: 'UnionBank', balance: 100, key: 3 },
        { id: 4, name: 'BPI', balance: 0, key: 4 },
    ]);

    return {
        subscribe,

        edit: (newAccData: accountType) => update((accounts) => {
            let nameChanged = false
            for (let i = 0; i < accounts.length; i++) {
                // Find account and update it
                if (accounts[i].id == newAccData.id) {
                    if (accounts[i].name !== newAccData.name)
                        nameChanged = true
                    let newAccount: accountType = {
                        id: newAccData.id,
                        name: newAccData.name,
                        balance: newAccData.balance,
                        key: generateUniqueKey()
                    } 
                    accounts[i] = newAccount
                    break;
                }
            }
            if (nameChanged) {
                records.update((records) => {
                    for (let i = 0; i < records.length; i++)
                        if (records[i].account_id === newAccData.id) {
                            records[i].account_name = newAccData.name
                            records[i].key = generateUniqueKey()
                        }
                    return records
                })
            }
            return accounts
        }),

        update,
        set
    };
}

// Currently not generating anything unique
const generateUniqueKey = ():number => {
    return Math.random() * 100_000_000;
}

export const records = createRecord();
export const accounts = createAccount()