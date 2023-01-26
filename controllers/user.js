// Import express and bookmark model
dotenv.config();
import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Express router
const router = express.Router();

// Error handler
const catcher = (res) => (error) => res.status(400).json({error})

router.post("/signup", async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(req.body).catch(catcher(res));
    res.json(newUser);
})

router.post("/login", async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (user) {        
            const match = await bcrypt.compare(password, user.password)
            if(match) {
                const token = await jwt.sign()
            }else {
                res.status(400).json({error: "PASSWORD DOES NOT MATCH"});
            }    
        }else {
            res.status(400).json({error: "USER NOT FOUND"})
        }
      } catch(error){
        res.status(400).json(error);
    }
});    
