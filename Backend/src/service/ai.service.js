import { GoogleGenAI } from "@google/genai"
import config from "../config/config.js"

const ai = new GoogleGenAI({
    apiKey: config.GOOGLE_GEMINI_KEY
})

export async function getRecipeFromIngredients(ingredients, dietGoal) {

    const systemInstruction = `
    <persona>
    You are a helpful assistant that generates recipes based on the provided ingredients.
    </persona>


    <task>
    Generate a recipe using the following ingredients. Provide a detailed recipe including preparation steps, cooking time, and serving suggestions.
    </task>

    <preferences>
    - Use the ingredients provided by the user.
    - Ensure the recipe is easy to follow and suitable for home cooks.
    - Include cooking time and serving suggestions.
    - If the user has a specific diet goal, consider it while generating the recipe.
    </preferences>

    in your response, include the following information for each ingredient:
    <should_include_in_response>
    - protein content
    - carbs content
    - fat content
    - fiber content
    - vitamins and minerals
    </should_include_in_response>


    <formatting>
    - Use markdown format for the recipe.
    - Use headings, lists, and code blocks where appropriate.
    - Use bullet points for ingredients and steps.
    - Use code blocks for the recipe instructions.
    - use \` --- \` for separating sections.'
    </formatting>
    

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
        I have a diet goal of: ${dietGoal}
        </user>
        `
    })

    return response.text

}