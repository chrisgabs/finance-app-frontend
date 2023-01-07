import Database from '../lib/Database';
import { records, accounts, user } from "../stores/stores"

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Databaase.fetchRecords() returns a promise. should be .then() instead of try catch
    let data = null;    

}