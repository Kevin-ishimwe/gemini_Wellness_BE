import express from "express";
import {
  geminiTextGenerate,
  geminiVoiceGenerate,
} from "../controllers/gemini-streaming";
import multer from "multer";

const geminiRoutes = express.Router();
const upload = multer();

//routes
geminiRoutes.post(
  "/conversation/voice",
  upload.single("audioBlob"),
  async (req, res) => {
    try {
      const { history } = req.body;
      res.status(201).json({
        response: await geminiVoiceGenerate(history, req.file),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);
geminiRoutes.post("/conversation/chat", async (req, res) => {
  try {
    const { history, prompt } = req.body;
    res.status(201).json({
      response: await geminiTextGenerate(prompt, history),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
export default geminiRoutes;
