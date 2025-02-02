import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import Message from "./Models/messgeModel.js";
import cors from "cors";
const app = express();
//cors with origin
app.use(
  cors({
    origin: "https://crowdsourced.vercel.app", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

//frontend url
// https://crowdsourced-1.onrender.com/

//socketio setup
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://crowdsourced.vercel.app", // Your frontend URL
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
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Routes
import userRoutes from "./routes/userRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/admin", adminRoutes);

app.post("/auth/google/callback", async (req, res) => {
  const { code } = req.body;

  try {
    // Exchange the code for tokens using the Google OAuth 2.0 service
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id:
          "221664733783-9lnk0s9559f85cd5aot6fg76uao2jtri.apps.googleusercontent.com",
        client_secret: "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",
        redirect_uri: `https://crowdsourced.vercel.app/google-auth`,
        grant_type: "authorization_code",
      }
    );

    console.log("tokenResponse", tokenResponse);
    const { access_token } = tokenResponse.data;

    // Issue a JWT token for your app
    // const jwtToken = jwt.sign(userInfo.data, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    // Send the JWT token and user info back to the frontend
    res.status(200).json({
      token: access_token,
      // user: userInfo.data,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to authenticate with Google" });
  }
});

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
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
