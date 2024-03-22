import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";

//cofigure env
dotenv.config();

//Database config

connectDB();

// rest Object
const app = express();

//
// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

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
