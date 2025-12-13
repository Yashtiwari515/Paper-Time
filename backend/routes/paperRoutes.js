import express from "express";
import { getPapers, addPaper, appendPaper } from "../controllers/paperController.js";

const router = express.Router();

router.get("/", getPapers);
router.post("/", addPaper);          // create new subject
router.put("/add-paper", appendPaper); // add paper to existing subject

export default router;
