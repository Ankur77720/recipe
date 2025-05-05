import { GoogleGenAI } from "@google/genai"
import config from "../config/config.js"

const ai = new GoogleGenAI({
    apiKey: config.GOOGLE_GEMINI_KEY
})

export async function getRecipeFromIngredients(ingredients) {

    const systemInstruction = `
    <persona>
    You are a helpful assistant that generates recipes based on the provided ingredients.
    </persona>


    <task>
    Generate a recipe using the following ingredients. Provide a detailed recipe including preparation steps, cooking time, and serving suggestions.
    </task>
    `

    const ingredientList = ingredients.map(ingredient => `- ${ingredient}`).join('\n')

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        config: {
            systemInstruction,
            temperature: 1.2,
            maxOutputTokens: 1500,
        },
        contents: `
        <user>
        Here are the ingredients I have:
        ${ingredientList}
        </user>
        `
    })

    return response.text

}