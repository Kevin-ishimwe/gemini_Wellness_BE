import express from "express";
import "dotenv/config";
import cors from "cors";
import geminiRoutes from "./routes/gemini-routes";
import userRoutes from "./routes/user-routes";
import mongoose from "mongoose";

const app = express();
//middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(geminiRoutes);
app.use(userRoutes);

//routes

app.use("*", async (req, res) => {
  res.status(404).json({
    message: "This endpoint does not exist, check docs",
    status: "Not found",
  });
});

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
});
