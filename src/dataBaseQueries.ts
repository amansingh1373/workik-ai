import { Db } from "mongodb";
import { Client, PoolClient } from 'pg';

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

export let initiateFetchQueryPostGre = async (client: PoolClient) => {
    try {
        const res = await client.query('SELECT * FROM playing_with_neon');
        console.log('Query Result:', res.rows);
        return res.rows;
    } catch (err) {
        console.error('Error running query', err);
        throw err; 
    }
};
