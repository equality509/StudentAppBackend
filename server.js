// Get env variables
dotenv.config();
// Import dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import router from "./controllers/student.js";
import UserRouter from "./controllers/user.js";



// Create express app
const app = express();

// Register middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({message: "gotcha!"})
})

// Routers
app.use("/student", router);
app.use("/user", UserRouter);

// Listener
const PORT = process.env.PORT ?? 4001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));