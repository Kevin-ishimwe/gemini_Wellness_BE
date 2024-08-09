import express from "express";
import {
  geminiTextGenerate,
  geminiVoiceGenerate,
  getHealthAnalysis,
  getHealthAnalysisSpecific,
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
        status: "success",
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
    res.status(200).json({
      response: await geminiTextGenerate(prompt, history),
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, status: "fail" });
  }
});
geminiRoutes.post("/health/analysis", getHealthAnalysis);
geminiRoutes.post("/health/analysis/specific", getHealthAnalysisSpecific);
export default geminiRoutes;
