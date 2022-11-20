export default class Database {

    public static fetchRecords = async () => {
        const response = await fetch('http://localhost:9090/records/get');
        let data = await response.json();
        data.forEach((element: { date: string | number | Date; }) => {
            element.date = new Date(element.date);
        });
        return data;
    }

}