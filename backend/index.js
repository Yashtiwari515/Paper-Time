require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Paper = require("./models/Paper");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.post("/api/papers", async (req, res) => {
  try {
    const paper = new Paper(req.body);
    await paper.save();
    res.status(201).json(paper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//All Courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Paper.distinct("course");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Branches for a Course
app.get("/api/branches/:course", async (req, res) => {
  try {
    const { course } = req.params;
    const branches = await Paper.find({ course }).distinct("branch");
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Years for Course + Branch
app.get("/api/years/:course/:branch", async (req, res) => {
  try {
    const { course, branch } = req.params;
    const years = await Paper.find({ course, branch }).distinct("year");
    res.json(years);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Subjects for Course + Branch + Year
app.get("/api/subjects/:course/:branch/:year", async (req, res) => {
  try {
    const { course, branch, year } = req.params;
    const subjects = await Paper.find({ course, branch, year }).distinct("subject");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Papers for a Subject
app.get("/api/papers/:course/:branch/:year/:subject", async (req, res) => {
  try {
    const { course, branch, year, subject } = req.params;
    const paper = await Paper.findOne({ course, branch, year, subject });
    res.json(paper?.papers || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//for localhost
// const PORT = process.env.PORT || 6969;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//for vercel
module.exports = app;