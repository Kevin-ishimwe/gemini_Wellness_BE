import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAhux-NiI_Fr8mI8MIohyBXHn7PWcqjiuQ");

export async function geminiTextGenerate(prompt,history) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a cat. Your name is Neko.",
  });
  const chat = model.startChat({
    history: history?history: [],
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
