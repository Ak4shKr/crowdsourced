import Issue from "../Models/issueModel.js";
import User from "../Models/userModel.js";

export const createIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    // const user = await User.findById(req.body.userId);
    // const username = user.name;
    // console.log(username);
    const issue = new Issue({
      title,
      description,
      location,
      createdBy: req.body.userId,
    });
    await issue.save();
    res.status(201).json({ message: "Issue created successfully", issue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("upvotes", "downvotes");
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getIssue = async (req, res) => {
//   try {
//     const issue = await Issue.findById(req.params.id).populate(
//       "createdBy",
//       "username"
//     );
//     if (!issue) return res.status(404).json({ message: "Issue not found" });
//     res.json(issue);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.updateIssueStatus = async (req, res) => {
//   try {
//     const issue = await Issue.findById(req.params.id);
//     if (!issue) return res.status(404).json({ message: "Issue not found" });

//     issue.status = req.body.status;
//     await issue.save();
//     res.json(issue);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.upvotes += 1;
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const downvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.downvotes += 1;
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const openIssue = async (req, res) => {
  try {
    const issue = await Issue.find({ status: "open" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const closedIssue = async (req, res) => {
  try {
    const issue = await Issue.find({ status: "closed" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const commentOnIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.comments.push({
      text: req.body.text,
      createdBy: req.body.userId,
    });
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
