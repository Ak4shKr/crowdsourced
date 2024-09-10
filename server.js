import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import Message from "./Models/messgeModel.js";
import cors from "cors";
const app = express();
app.use(express.json());

//socketio setup
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with the URL of your frontend
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});
io.on("connection", (socket) => {
  console.log("New client connected");

  // Example Socket.IO event
  socket.on("chatMessage", async (msg) => {
    console.log("Message received: ", msg);
    const message = new Message({
      sender: msg.sender,
      text: msg.text,
      senderId: msg.senderId,
    });
    await message.save();
    io.emit("chatMessage", msg); // Broadcast the message to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

//env config
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

//cors with origin
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
import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/admin", adminRoutes);

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
server.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
