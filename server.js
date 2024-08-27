import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(express.json());

//env config
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

//cors with origin
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the URL of your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
import userRoutes from "./routes/userRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

//server connection
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
