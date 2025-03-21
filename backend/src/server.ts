import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import apiRoutes from "./routes/index";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Environment variables loaded:");
// console.log({
//   PORT: process.env.PORT,
//   NODE_ENV: process.env.NODE_ENV,
//   MONGO_URI: process.env.MONGO_URI ? "Set" : "Not set",
//   JWT_SECRET: process.env.JWT_SECRET ? "Set" : "Not set",
//   GROQ_API_KEY: process.env.GROQ_API_KEY ? "Set" : "Not set",
//   EXA_API_KEY: process.env.EXA_API_KEY ? "Set" : "Not set",
//   RUNWARE_API_KEY: process.env.RUNWARE_API_KEY ? "Set" : "Not set",
// });

connectDB();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "API endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
