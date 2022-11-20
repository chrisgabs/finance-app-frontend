import Database from '../lib/Database';
 
/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        records: await Database.fetchRecords()
    };
}