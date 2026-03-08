import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.route.js";
import resumeRouter from "./routes/resume.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRouter);

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
