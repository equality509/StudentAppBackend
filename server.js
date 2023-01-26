// Import dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import router from "./controllers/student.js";
import UserRouter from "./controllers/user.js";
import auth from "./auth/index.js";

dotenv.config();


// Create express app
const app = express();

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
app.use("/student", router);


// Listener
const PORT = process.env.PORT ?? 4001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));