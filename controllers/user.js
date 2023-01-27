// Import express and bookmark model
import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
dotenv.config();
const router = express.Router();
const { SECRET } = process.env;



router.post("/signup", async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({error});
    }
});

router.post("/login", async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (user) {        
            const match = await bcrypt.compare(password, user.password)
            if(match) {
                const token = await jwt.sign({username}, SECRET);
                res.status(200).json({token});
            }else {
                res.status(400).json({error: "PASSWORD DOES NOT MATCH"});
            }    
        }else {
            res.status(400).json({error: "USER NOT FOUND"})
        }
    } catch (error) {
        res.status(400).json(error);
    }
});    

export default router;
