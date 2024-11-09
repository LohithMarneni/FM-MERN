import Questions from "../models/questionsSchema.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getQuestions = async (req, res) => {
  const prompt = `Generate exactly 5 funny and crazy food-related questions and options in JSON format only. 
  The format should be:
  [
    {
    "question": "Your question here?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    ...
  ]
  Only return the JSON array, with no extra comments, explanations, or symbols.`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.trim();

    let questionsData;
    try {
      questionsData = JSON.parse(responseText);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return res
        .status(500)
        .json({ message: "Failed to parse questions JSON format." });
    }

    const questionSet = await Questions.create({
      user: req.user._id,
      questions: questionsData,
    });
    
    res.status(200).json(questionsData);
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ message: "Failed to generate questions" });
  }
};
export const getSuggestions = async (req, res) => {
  const userAnswers = req.body.answers;

  if (!userAnswers || !Array.isArray(userAnswers) || userAnswers.length === 0) {
    return res
      .status(400)
      .json({ error: "Answers should be an array of options." });
  }

  try {
    // Fetch the latest question set for the authenticated user
    const questionSet = await Questions.findOne({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (!questionSet) {
      return res
        .status(404)
        .json({ error: "No questions found to associate answers with." });
    }

    questionSet.questions.forEach((question, index) => {
      question.userAnswer = userAnswers[index] || null;
    });

    await questionSet.save();

    const conversationHistory = [
      {
        role: "system",
        content: `Questions: ${JSON.stringify(questionSet.questions)}`,
      },
      { role: "user", content: `Answers: ${JSON.stringify(userAnswers)}` },
    ];

    const historyContent = conversationHistory
      .map((entry) => `${entry.role}: ${entry.content}`)
      .join("\n");
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

    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.trim();

    let suggestions;
    try {
      suggestions = JSON.parse(responseText);
    } catch (jsonError) {
      console.error(
        "Error parsing JSON:",
        jsonError,
        "Response:",
        responseText
      );
      return res
        .status(500)
        .json({ message: "Failed to parse suggestions JSON format." });
    }

    res.status(200).json(suggestions);

  } catch (error) {
    console.error("Error generating suggestions:", error);
    res.status(500).json({ error: "Failed to generate suggestions" });
  }
};
