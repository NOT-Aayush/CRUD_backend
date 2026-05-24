import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import errorHandling from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
dotenv.config();


const app = express();
const port = process.env.PORT || 5001;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", userRoutes);

//error handling
app.use(errorHandling);

//Create table before starting server
createUserTable();

//testing postgress
app.get("/", async(req , res) =>{
    const result = await pool.query("SELECT current_database()");
    res.send(`The database is : ${result.rows[0].current_database}`)
})
//server running
app.listen(port, () =>{
    console.log(`Server is running on ${port} `)
})