const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
const db = require("./config/database");

//Dot ENV Init
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

//Routes
const users = require("./routes/userRoutes");
const tours = require("./routes/tourRoutes");

//Middlewares
db();

const app = express();
const PORT = process.env.PORT || 5000;

//Other middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Socket Server
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = [];
const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  return onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

//Routes Initialization
app.use("/api/v1/users", users);
app.use("/api/v1/tours", tours);

//Port listener
const server = app.listen(
  PORT,
  console.log(
    "Server running on " + process.env.NODE_ENV + " mode on port " + PORT
  )
);

io.listen(server);

//Error handling for shutting down the server
process.on("uncaughtException", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down server due to uncaught rejection ");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down server due to unhandled promise rejection ");
  server.close(() => {
    process.exit(1);
  });
});
