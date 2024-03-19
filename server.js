import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

//cofigure env
dotenv.config();

//Database config

connectDB();

// rest Object
const app = express();

//
// middleware
app.use(express.json());
app.use(morgan("dev"));

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to app setup</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// run listen port
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});
