import { writable, type Writable } from 'svelte/store';
import type { accountType } from '../types/account.type';
import type { recordType } from "../types/record.type";
import type { userType } from '../types/user.type';

export const records = writable<recordType[]>([
    // { type: 'transportation', account: 'gcash', amount: 1000, date: new Date("2022-03-01")},
    // { type: 'food', account: 'cash', amount: 1500, date: new Date("2022-03-01")},
    // { type: 'Others', account: 'bank', amount: 2000, date: new Date("2022-03-01")},
]);

export const accounts = writable<accountType[]>([
    { _id: '1', name: 'Cash', amount: 50000, color: '#f44336' },
    { _id: '2', name: 'UnionBank', amount: 100, color: '#f44336' },
    // { _id: '3', name: 'Gcash', amount: 8938, color: '#f44336' },
    // { _id: '4', name: 'Banko Sentral ng Pilipinas', amount: 1000, color: '#f44336' },
    // { _id: '5', name: 'Metrobank', amount: 10000, color: '#f44336' },
    // { _id: '6', name: 'Metrobank', amount: 2849, color: '#f44336' },
]);

export const user = writable<userType>({
    id: '',
    name: '',
    picture: ''
});