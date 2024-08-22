import express from "express";
import {
  userRegister,
  userLogin,
  allIssueByUser,
  allusers,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/allusers", authMiddleware, allusers);
router.get("/allIssues", authMiddleware, allIssueByUser);

export default router;
