import { GoogleGenerativeAI } from "@google/generative-ai";
import { system_prompt, safety_settings } from "../middleware/gemini-config";

const genAI = new GoogleGenerativeAI("AIzaSyAhux-NiI_Fr8mI8MIohyBXHn7PWcqjiuQ");

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
