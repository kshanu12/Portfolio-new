import { GoogleGenAI } from "@google/genai";
import { formatAbout, formatExperience, formatProjects, formatSkills, formatSocialMedia } from "@/utils/formatData";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { message } = req.body;

  try {

    const systemPrompt = `
You are Shanu's virtual assistant for his personal portfolio website. You should answer questions related to his professional experience, skills, projects, and background. Be friendly, helpful, and conversational.

If a question isn't related to his portfolio, respond with: 
"Sorry, I don't have enough information. Can you please clarify if the question is related to my portfolio?"

Use this structured data to guide your answers:

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
`;

    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
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
