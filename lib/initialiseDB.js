import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initialiseDB() {
  const db = await open({
    driver: sqlite3.Database,
    filename: "database.db",
  });

  // await db.migrate()

  return db;
}
