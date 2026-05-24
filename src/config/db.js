import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    connectionTimeoutMillis: 5000
});
pool.on("connect", ()=>{
    console.log("connection pool established with db")
})

export default pool