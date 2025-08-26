const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    course: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    subject: { type: String, required: true },
    papers: [
      {
        year: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
);

const Paper = mongoose.models.Paper || mongoose.model("Paper", paperSchema);

module.exports = Paper;
