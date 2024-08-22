import express from "express";
import {
  getAllIssues,
  createIssue,
  openIssue,
  closedIssue,
  resolvedIssue,
  commentOnIssue,
  upvoteIssue,
  downvoteIssue,
} from "../controllers/issueController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createIssue", authMiddleware, createIssue);
router.get("/allIssues", authMiddleware, getAllIssues);
router.get("/openIssues", openIssue);
router.get("/closedIssues", closedIssue);
router.get("/resolvedIssues", resolvedIssue);
router.post("/commentIssue/:id", authMiddleware, commentOnIssue);
router.post("/upvoteIssue/:id", authMiddleware, upvoteIssue);
router.post("/downvoteIssue/:id", authMiddleware, downvoteIssue);
export default router;