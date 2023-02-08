import { writable, type Writable } from 'svelte/store';
import type { accountType } from '../types/account.type';
import type { recordType } from "../types/record.type";
import type { userType } from '../types/user.type';

export const records = writable<recordType[]>([
    { id: 1, transaction_type: "Expense", purpose: 'Trasnportation', account: 'Unionbank', amount: 1000, date_time: new Date("2022-03-01")},
    { id: 2, transaction_type: "Expense", purpose: 'Food', account: 'BPI', amount: 100000, date_time: new Date("2022-03-01")},
    { id: 3, transaction_type: "Expense", purpose: 'Communication', account: 'Cash', amount: 2000, date_time: new Date("2022-03-01")},
    { id: 4, transaction_type: "Expense", purpose: 'Others', account: 'bank', amount: 1234, date_time: new Date("2022-03-01")},
    { id: 5, transaction_type: "Expense", purpose: 'Others', account: 'bank', amount: 5, date_time: new Date("2022-03-01")},
    { id: 6, transaction_type: "Expense", purpose: 'Others', account: 'bank', amount: 2000, date_time: new Date("2022-03-01")},
]);

export const accounts = writable<accountType[]>([
    { id: 1, name: 'Gcash', balance: 500_00},
    { id: 2, name: 'Cash', balance: 800_000},
    { id: 3, name: 'UnionBank', balance: 100},
    { id: 4, name: 'BPI', balance: 0},
    // { _id: '3', name: 'Gcash', amount: 8938, color: '#f44336' },
    // { _id: '4', name: 'Banko Sentral ng Pilipinas', amount: 1000, color: '#f44336' },
    // { _id: '5', name: 'Metrobank', amount: 10000, color: '#f44336' },
    // { _id: '6', name: 'Metrobank', amount: 2849, color: '#f44336' },
]);

// export const user = writable<userType>({
//     id: '',
//     name: '',
// });