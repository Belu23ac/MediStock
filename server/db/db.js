import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function connectToUsersDatabase() {
    // Adjust the filename path to your project structure
    const db = await open({
        filename: './users.db', // for example; ensure the "src/db" folder exists
        driver: sqlite3.Database
    });
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password INTEGER NOT NULL
      );
    `);
    
    console.log("Connected to database and ensured users table exists");
    return db;
}

export async function connectToOrdersDatabase() {
    // Adjust the filename path to your project structure
    const db = await open({
        filename: './orders.db', // for example; ensure the "src/db" folder exists
        driver: sqlite3.Database
    });
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        orderId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        userOrder TEXT NOT NULL,
        isEmergency BOOLEAN NOT NULL DEFAULT 0,
        time DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log("Connected to database and ensured orders table exists");
    return db;
}