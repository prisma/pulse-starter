import { Pool } from "pg";

async function main() {
	const connection = {
		user: process.env.PGUSER,
		host: process.env.PGHOST,
		database: process.env.PGDATABASE,
		password: process.env.PGPASSWORD,
		port: Number(process.env.PGPORT),
	};
	console.log("made it here :D", connection);
	const pool = new Pool(connection);

	try {
		console.log("trying to connect");
		const db = await pool.connect();
		console.log("connected to database");
		console.log("dropping timescale extension");
		await db.query("DROP EXTENSION timescaledb");
		console.log("running alter wal_level");
		await db.query("ALTER SYSTEM SET wal_level = logical");
		console.log("running alter max_replication_slots");
		await db.query("ALTER SYSTEM SET max_replication_slots = 20");
		console.log("running alter wal_keep_size");
		await db.query("ALTER SYSTEM SET wal_keep_size = 2048");
		console.log("reloading conf");
		await db.query("SELECT pg_reload_conf()");
	} catch (err) {
		console.log(err);
	}
}

main();
