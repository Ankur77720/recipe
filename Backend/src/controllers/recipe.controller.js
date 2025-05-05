import { getRecipeFromIngredients } from "../service/ai.service.js";

export const submitIngredientsController = async (req, res) => {
    try {
        const { ingredients,dietGoal } = req.body;

        // Validate ingredients
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid array of ingredients"
            });
        }

        // Here you would typically save the ingredients to a database
        // For now, we'll just log them and return a success response

        console.log("Received ingredients:", ingredients);
        
        const recipe = await getRecipeFromIngredients(ingredients,dietGoal);

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Ingredients received successfully",
            ingredients,
            recipe
        });
    } catch (error) {
        console.error("Error in submitIngredientsController:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to process ingredients"
        });
    }
};