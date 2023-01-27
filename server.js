// Import dependencies
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import mongoose from "./connection/connection.js"
import StudentRouter from "./controllers/student.js";
import UserRouter from "./controllers/user.js";
import auth from "./auth/index.js";






// Register middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", auth, (req, res) => {
    res.json(req.payload);
});

// Routers

app.use("/user", UserRouter);
app.use("/student", StudentRouter);


// Listener
const PORT = process.env.PORT ?? 4001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));