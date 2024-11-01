import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Initialize conversation history
let conversationHistory = [];

export const getQuestions = async (req, res) => {
  // Clear the conversation history on each question generation
  conversationHistory = [];

  const prompt = `Generate exactly 5 funny and crazy food-related questions and options that help understand the mood and character of the person who answers them. every time give questions randomly 
    Output strictly in JSON format as an array of objects like:
    [
      {
        "question": "Your question here?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
      },
      ...
    ]
    Only return the JSON, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const questions = JSON.parse(responseText);

    // Store questions in conversation history for future reference
    conversationHistory.push({ role: "system", content: prompt });
    conversationHistory.push({ role: "assistant", content: responseText });

    res.json(questions); // Send questions to the frontend
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
};

export const getSuggestions = async (req, res) => {
  const userAnswers = req.body.answers;

  if (!userAnswers || !Array.isArray(userAnswers)) {
      return res.status(400).json({ error: 'Answers should be an array of options.' });
  }

  // Add user answers to conversation history
  conversationHistory.push({ role: "user", content: `Answers: ${JSON.stringify(userAnswers)}` });

  // Combine questions and user answers for a contextual prompt
  const historyContent = conversationHistory.map(entry => `${entry.role}: ${entry.content}`).join("\n");
  const prompt = `Here are the questions and user answers: \n${historyContent} \n\nBased on these answers, suggest exactly 3 foods that match the user's character and mood. 
  Output strictly in JSON format as:
  [
    {
      "food": "Food item name",
      "description": "Brief description of why it matches their mood"
    },
    ...
  ]
  Only return the JSON, nothing else.`;

  try {
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      const suggestions = JSON.parse(responseText);

      // Append the suggestions to the conversation history
      // conversationHistory.push({ role: "system", content: prompt });
      // conversationHistory.push({ role: "assistant", content: responseText });

      res.json(suggestions); // Send suggestions to frontend

      // Clear conversation history after suggestions are provided
      conversationHistory = [];
  } catch (error) {
      console.error('Error generating suggestions:', error);
      res.status(500).json({ error: 'Failed to generate suggestions' });
  }
};
