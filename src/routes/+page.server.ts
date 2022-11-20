import Database from '../lib/server/Database';
 
/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        records: await Database.fetchRecords()
    };
}