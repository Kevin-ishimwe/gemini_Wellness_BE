import express from "express";
import { geminiTextGenerate } from "../controllers/gemini-streaming";
import multer from "multer";

const geminiRoutes = express.Router();
const upload = multer();

//routes
geminiRoutes.post(
  "/conversation",
  upload.single("audioBlob"),
  async (req, res) => {
    try {
      const {  history } = req.body;
      res.status(201).json({
        response: await geminiTextGenerate( history, req.file),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);
export default geminiRoutes;
