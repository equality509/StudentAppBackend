// Import express and bookmark model
import express from "express";
import Student from "../models/student.js";
import auth from "../auth/index.js";

// Express router
const router = express.Router();

// "/student" - index route
router.get("/", auth, async (req, res) => {
  try {
    const { username } = req.payload;
    res.status(200).json(await Student.find({ username }));
  } catch (error) {
    res.status(400).json({ error });
  }
});

// "/student" - create route
router.post("/", auth, async (req, res) => {
  try {
    const { username } = req.payload;
    req.body.username = username;
    res.status(200).json(await Student.create(req.body));
  } catch (error) {
    res.status(400).json({ error });
  }
});

// "/student/:id" - update route
router.put("/:id", auth, async (req, res) => {
  try {
    const { username } = req.payload;
    req.body.username = username;
    const { id } = req.params;
    res.status(200).json(await Student.findByIdAndUpdate(id, req.body, {new: true}));
  } catch (error) {
    res.status(400).json({ error });
  }
});

// "/student/:id" - delete route
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await Student.findByIdAndRemove(id));
  } catch (error) {
    res.status(400).json({ error });
  }
});

// "/student/:id" - show route
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await Student.findById(id));
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
