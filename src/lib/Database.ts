import type { record } from "src/types/record.type";

export default class Database {

    public static fetchRecords = async () => {
        const response = await fetch('http://localhost:9090/records/get');
        let data = await response.json();
        data.forEach((element: { date: string | number | Date; }) => {
            element.date = new Date(element.date);
        });
        return data;
    }

    public static addRecord = async (record: record) => {
        const response = await fetch('http://localhost:9090/records/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });
        return response.json();
    }

}