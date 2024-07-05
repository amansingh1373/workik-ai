import { Db } from "mongodb";

export let initiateFetchQueryMongoDB = async (db: Db) => {
    try {
        const collection = db.collection('users');
        const docs = await collection.find({}).toArray();
        if (docs.length === 0) {
            console.log('no data to display');
        } else {
            docs.forEach((doc) => {
                console.log(doc);
            });
            return docs;
        }
    } catch (err) {
        console.error('Error running query', err);
    }
};