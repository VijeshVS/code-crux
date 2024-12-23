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

export async function getDetails(code: string) {
  const prompt = `You are given with a code : ${code}. Your job is to analyze time and space complexity
                    of the code accurately. You need to give step by step breakdown of time and space complexity.
                    IMPORTANT: Return result in below format in form of stringified JSON
                    {
                      final_time_complexity: string,
                      time_steps : {
                        step: string,
                        complexity: string,
                        explanation: string
                      }[],
                      final_time_complexity_explaination: string,
                      final_space_complexity: string,
                      space_steps : {
                        step: string,
                        complexity: string,
                        explanation: string
                      }[],
                      final_space_complexity_explanation: string
                    }
                    Please analyze the code carefully and come to conclusion. Don't give the time or space complexity of optimized/better code. Just give results for current code given to you.
                    IMPORTANT: Don't suggest the ways to optimize code. Just be concerned with the code given to you and analyze it.
                    IMPORTANT: Do not provide any extra or unnecessary details/information
                    IMPORTANT: Response should be in normal text. Don't bold italic etc
                    IMPORTANT: If something other than code is given. Return invalid for all keys`;

  const result = await model.generateContent([prompt]);
  const json = result.response.text();
  const analysis = JSON.parse(json.slice(7, -4));

  return analysis;
}
