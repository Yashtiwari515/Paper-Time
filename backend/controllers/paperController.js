import Paper from "../models/Paper.js";

// @desc Get papers by course/branch/year/subject
// @route GET /api/papers

export const getPapers = async (req, res) => {
  const { course, branch, year, subject } = req.query;

  try {
    const papers = await Paper.findOne({ course, branch, year, subject });
    if (!papers) {
      return res.status(404).json({ message: "No papers found" });
    }
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new paper entry
// @route POST /api/papers

export const addPaper = async (req, res) => {
  const { course, branch, year, subject, papers } = req.body;

  try {
    const newPaper = new Paper({ course, branch, year, subject, papers });
    const saved = await newPaper.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
