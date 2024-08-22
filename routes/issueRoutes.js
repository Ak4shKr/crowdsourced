import express from "express";
import { getAllIssues, createIssue } from "../controllers/issueController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createIssue", authMiddleware, createIssue);
router.get("/allIssues", authMiddleware, getAllIssues);
export default router;
