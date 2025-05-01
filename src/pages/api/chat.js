import { GoogleGenAI } from "@google/genai";
import { formatAbout, formatExperience, formatProjects, formatSkills } from "@/utils/formatData";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBj0ZrFnQF2g56E1REspuZpMvrlVn20yL8" }); // Must come from makersuite.google.com

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { message } = req.body;

  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a chatbot assistant for a personal portfolio. Your primary goal is to answer questions related to my professional experience, but feel free to respond to casual conversation or general greetings as well. If the user asks something unrelated to my experience, politely respond with: "Sorry, I don't have enough information. Can you please clarify if the question is related to my portfolio?" Ensure your answers are simple, clear, and direct.
ABOUT ME:
${formatAbout()}

EXPERIENCE:
${formatExperience()}

PROJECTS:
${formatProjects()}

SKILLS:
${formatSkills()}

You are Shanu's virtual assistant, here to help you learn more about his professional journey, skills, and projects. Let me know what you'd like to know!
`,
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    if (response) {
      res.status(200).json({ reply: response.text });
    } else {
      res.status(500).json({ reply: "No response from the model." });
    }
  } catch (error) {
    console.error("Error calling Gemini:", error);
    res.status(500).json({ reply: "Something went wrong." });
  }
}
