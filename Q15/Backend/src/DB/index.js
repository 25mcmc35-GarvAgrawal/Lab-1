import mysql from "mysql2/promise";

let pool;

const getDB = () => {
    if (!pool) {
        pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: process.env.DB_PASSWORD,
            database: "notes",
        });

        console.log("DB pool created ✅");
    }

    return pool;
};

export default getDB;