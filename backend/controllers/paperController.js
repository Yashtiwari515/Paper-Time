import Paper from "../models/Paper.js";

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

export const appendPaper = async (req, res) => {
  const { course, branch, year, subject, papers } = req.body;

  try {
    const existingPaper = await Paper.findOne({
      course,
      branch,
      year,
      subject,
    });

    if (!existingPaper) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    // Existing years ko Set me store karo
    const existingYears = new Set(existingPaper.papers.map((p) => p.year));

    // Sirf naye years wale papers rakho
    const newPapers = papers.filter((paper) => !existingYears.has(paper.year));

    if (newPapers.length === 0) {
      return res.status(400).json({
        message: "All provided papers already exist",
      });
    }

    // New papers append karo
    existingPaper.papers.push(...newPapers);

    const updatedPaper = await existingPaper.save();

    res.json({
      message: `${newPapers.length} paper(s) added successfully`,
      added: newPapers,
      papers: updatedPaper.papers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
