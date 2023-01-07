const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
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
