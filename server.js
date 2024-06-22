import express from "express";
import "dotenv/config";
import cors from "cors";
import geminiRoutes from "./src/routes/gemini-routes";

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

//routes
app.use(geminiRoutes);

app.use("*", async (req, res) => {
  res.status(404).json({
    message: "This endpoint does not exist, check docs",
    status: "Not found",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
