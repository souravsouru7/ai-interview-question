"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use environment variable for API key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined in environment variables");
}

// Initialize the Generative AI
const genAI = new GoogleGenerativeAI(apiKey);

// Get the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  },
});

// Create and export chat session
export const startNewChat = async () => {
  try {
    const chat = await model.startChat();
    return chat;
  } catch (error) {
    console.error("Error starting chat session:", error);
    throw error;
  }
};

export { model };