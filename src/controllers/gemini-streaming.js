import { GoogleGenerativeAI } from "@google/generative-ai";
import { system_prompt, safety_settings } from "../middleware/gemini-config";

const genAI = new GoogleGenerativeAI("AIzaSyAhux-NiI_Fr8mI8MIohyBXHn7PWcqjiuQ");

export async function geminiTextGenerate(history, audioBlob) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: system_prompt,
    safetySettings: safety_settings,
  });

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
