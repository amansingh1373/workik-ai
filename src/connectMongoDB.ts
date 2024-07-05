import { MongoClient, Db } from 'mongodb';
import { MONGODB_URI } from './privatedata';

let db: Db | null = null;

async function connectMongoDB(): Promise<Db> {
    console.log('connecting...');
    const uri: string = MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        db = client.db('sample_mflix');
        console.log('Connected to MongoDB');
        return db;
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
        throw err;
    }
}

export { connectMongoDB };
