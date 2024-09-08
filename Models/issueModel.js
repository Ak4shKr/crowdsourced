import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "resolved", "rejected"],
    default: "open",
  },
  type: {
    type: String,
    enum: ["corrouption", "service", "others"],
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // type: String,
    // required: true,
  },
  complainer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
