import { Pool, PoolClient } from 'pg';
import { POSTGRESQL_URI } from './privatedata';

const pool = new Pool({
    connectionString: POSTGRESQL_URI,
});

async function connectPostgreSQL(): Promise<PoolClient> {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL');
        return client;
    } catch (err) {
        console.error('Could not connect to PostgreSQL', err);
        throw err;
    }
}

export { connectPostgreSQL };