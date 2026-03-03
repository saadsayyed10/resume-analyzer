import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
