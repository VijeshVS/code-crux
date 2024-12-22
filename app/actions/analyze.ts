"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyze(code: string) {
  const prompt = `You are given with a code : ${code}. Your job is to analyze time and space complexity
                    of the code accurately. 
                    IMPORTANT: Return time complexity, explanation for time complexity, space complexity, explanation for space complexity at once seperated by |
                    IMPORTANT: Do not provide any extra or unnecessary details/information
                    IMPORTANT: Response should be in normal text. Don't bold italic etc
                    IMPORTANT: If something other than code is given. Return invalid for all params`;

  const result = await model.generateContent([prompt]);
  const [time, timeExplanation, space, spaceExplanation] = result.response
    .text()
    .split("|");

  return { time, timeExplanation, space, spaceExplanation };
}
