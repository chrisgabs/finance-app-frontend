import Database from '../lib/Database';
 
/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Databaase.fetchRecords() returns a promise. should be .then() instead of try catch
    let data = null;    
    try {
        // data = {records: await Database.fetchRecords()}
    }catch(err){
        return {error: true};
    }
}