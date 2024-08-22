import User from "../Models/userModel.js";
import Issue from "../Models/issueModel.js";
import generateToken from "../utils/generateToken.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    return res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      password,
    });
    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    return res.status(400).json({ message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const allIssueByUser = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.body.userId });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allusers = async (req, res) => {
  try {
    const users = await User.find();
    const totaluser = users.length;
    res.json({ users, totaluser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
