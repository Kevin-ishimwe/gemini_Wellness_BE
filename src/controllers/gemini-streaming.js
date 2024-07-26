import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  system_prompt,
  safety_settings,
  analysis_system_prompt,
} from "../middleware/gemini-config";

const API_KEY = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: system_prompt,
  safetySettings: safety_settings,
});
export async function geminiVoiceGenerate(history, audioBlob) {
  // Initialize the chat with optional chat history
  let chat = model.startChat({ history: history ? history : [] });

  const base64Audio = audioBlob.buffer.toString("base64");
  const request = {
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: audioBlob.mimetype,
              data: base64Audio,
            },
          },
          {
            text: `write the response in json file format :{"prompt":"very brief summary analysis user request here for history i.e greeting etc", "model":"your therapy response here"`,
          },
        ],
      },
    ],
  };

  const result = await model.generateContent(request);
  const response = await result.response;
  return response.text();
}

export async function geminiTextGenerate(prompt, history) {
  const chat = model.startChat({
    history: history ? history : [],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });
  const result = await chat.sendMessageStream(prompt);
  let text = "";
  for await (const chunk of result.stream) {
    const chunkText = await chunk.text(); // Assuming chunk.text() returns a Promise
    console.log("AI: ", chunkText);
    text += chunkText;
  }
  return text;
}

export const getHealthAnalysis = async (req, res) => {
  try {
    const { userData } = req.body;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: analysis_system_prompt,
      safetySettings: safety_settings,
    });
    const prompt = `
        Analyze the following health data and provide insights correct json format:
        ${JSON.stringify(userData)}
      `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    const analysis = analysisText;

    res.json({
      message: "analysis complete",
      data: analysis,
      status: " success",
    });
  } catch (error) {
    console.error("Error in AI health analysis:", error);
    res.status(500).json({
      status: " error",
      message: "Error generating health analysis",
      error: error.message,
    });
  }
};
