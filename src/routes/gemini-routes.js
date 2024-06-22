import express from "express";
import {geminiTextGenerate} from "../controllers/gemini-streaming";

console.log(geminiTextGenerate);

const geminiRoutes = express.Router();


//routes
geminiRoutes.post("/conversation", async (req, res) => {
  try {
    const { prompt,history } = req.body;
    res.status(201).json({ response: await geminiTextGenerate(prompt,history) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default geminiRoutes;
