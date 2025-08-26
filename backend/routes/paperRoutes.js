import express from "express";
import { getPapers, addPaper } from "../controllers/paperController.js";

const router = express.Router();

router.get("/", getPapers);   // GET papers
router.post("/", addPaper);   // Add new papers

export default router;
