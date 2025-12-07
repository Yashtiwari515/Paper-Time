require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Paper = require("./models/Paper");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",                // local Vite dev
  "https://paper-time-preparation.vercel.app",      // deployed frontend
  "https://paper-time.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

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


//chat bot setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chatbot endpoint
app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;

  try {
    // Use Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Extract course, branch, year, subject from this user query:
       "${message}"
       Respond ONLY in JSON like:
       { "course": "...", "branch": "...", "year": "...", "subject": "..." }`
    );

    let text = result.response.text();

    // 🧹 Clean Gemini response (remove ```json ... ```)
    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("❌ JSON parse failed. Raw text:", text);
      return res.status(500).json({ error: "Invalid response format from AI." });
    }

    const { course, branch, year, subject } = data;

    // Query MongoDB
    const paper = await Paper.findOne({ course, branch, year, subject });

    if (!paper || !paper.papers || paper.papers.length === 0) {
      // return res.json({
      //   reply: `Sorry, I couldn’t find a paper for ${course}, ${branch}, ${year}, ${subject}.`
      // });
      const aiAnswer = await model.generateContent(message);
      return res.json({
        reply: aiAnswer.response.text()
      });
    }

    res.json({
      reply: `Here are the papers for ${subject}:`,
      papers: paper.papers
    });

  } catch (err) {
    console.error("❌ Chatbot Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// for localhost
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));