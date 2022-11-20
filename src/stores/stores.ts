import { writable, type Writable } from 'svelte/store';
import type { record } from "../types/record.type";

export const records = writable<record[]>([
    // { type: 'transportation', account: 'gcash', amount: 1000, date: new Date("2022-03-01")},
    // { type: 'food', account: 'cash', amount: 1500, date: new Date("2022-03-01")},
    // { type: 'Others', account: 'bank', amount: 2000, date: new Date("2022-03-01")},
]);

