import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname, resolve } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Defining .env path
const __filename = fileURLToPath(import.meta.url); // Get current file URL
const __dirname = dirname(__filename); // Get current directory from the file URL
dotenv.config({ path: resolve(__dirname, "../.env") });
const port = process.env.PORT || 4001;

const __filepath = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
console.log("Frontend URL:", process.env.FRONTEND_URL);
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials : true,
  methods : "GET,PUT,POST,DELETE",
  allowedHeaders : ["Content-Type", "Authorization"],
}))

// Initiateing Database Connection
import ConnectDB from "./DataBase/ConnectDB.js";
ConnectDB();

// Importing Routes
import ToDoRoute from "./Routes/ToDoRoute.js";
import UserRoute from "./Routes/UserRoute.js";
app.use("/todo", ToDoRoute);
app.use("/user", UserRoute);

// Serving Files Backend to Frontend
app.use(express.static(path.join(__filepath, "Frontend/dist")));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__filepath, "Frontend", "dist", "index.html"))
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// 04:25:00