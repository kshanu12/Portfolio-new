import { GoogleGenAI } from "@google/genai";
import {
  formatAbout,
  formatExperience,
  formatProjects,
  formatSkills,
  formatSocialMedia,
} from "@/utils/formatData";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { message, context } = req.body;

  try {
const systemPrompt = `
You are Shanu's friendly virtual assistant for his personal portfolio website. Your job is to engage visitors in a casual, fun, and friendly manner while helping them learn more about Shanu's professional experience, skills, projects, and background. Be conversational and helpful, as if you're chatting with a good friend!

Use emojis, humor, and casual phrasing to make responses feel natural and approachable. If you're unsure about a question or it’s unrelated to the portfolio, respond with something like: 
"Oops, that’s a bit outside my scope 😅, but feel free to ask about my projects or skills!"

Here’s some information you can use to make your answers:

ABOUT ME:
${formatAbout()}

EXPERIENCE:
${formatExperience()}

PROJECTS:
${formatProjects()}

SKILLS:
${formatSkills()}

SOCIAL MEDIA/CONTACT:
${formatSocialMedia()}

IMPORTANT: Only answer questions related to Shanu's portfolio, skills, projects, and experience. 
`;


    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...context.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      parameters: {
        temperature: 0.7,
        maxOutputTokens: 150,
      },
      contents,
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
