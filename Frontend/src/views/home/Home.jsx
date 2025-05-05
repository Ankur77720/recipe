import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import './Home.css'


const Home = () => {
    const user = useSelector((state) => state.user);
    const [ ingredient, setIngredient ] = useState('');
    const [ ingredients, setIngredients ] = useState([]);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ recipe, setRecipe ] = useState(null);
    const [ dietGoal, setDietGoal ] = useState('balanced');

    const dietGoalOptions = [
        { value: 'balanced', label: 'Balanced Diet' },
        { value: 'weight-gain', label: 'Weight Gain' },
        { value: 'weight-loss', label: 'Weight Loss' },
        { value: 'muscle-build', label: 'Muscle Building' },
        { value: 'low-carb', label: 'Low Carb' },
        { value: 'high-protein', label: 'High Protein' }
    ];

    const handleAddIngredient = (e) => {
        e.preventDefault();
        if (ingredient.trim()) {
            setIngredients([ ...ingredients, ingredient.trim() ]);
            setIngredient('');
        }
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [ ...ingredients ];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleSubmitIngredients = async () => {
        if (ingredients.length === 0) {
            setMessage('Please add at least one ingredient');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/recipe/ingredients`, {
                ingredients,
                dietGoal
            }, {
                withCredentials: true
            });

            console.log('Response from server:', response.data);

            setRecipe(response.data.recipe);

            setMessage('Ingredients submitted successfully!');
            setIngredients([]);
        } catch (error) {
            setMessage('Failed to submit ingredients. Please try again.');
            console.error('Error submitting ingredients:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="home-section">
            <div className="home-container">
                {user.username ? <h1>Welcome, {user.username}!</h1> : <h1>Home</h1>}

                <div className="ingredients-section">
                    <h2>Add Ingredients</h2>
                    <p>Enter ingredients one by one and submit when done</p>

                    <form onSubmit={handleAddIngredient}>
                        <div className="ingredient-input">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                placeholder="Enter an ingredient"
                            />
                            <button type="submit">Add</button>
                        </div>
                    </form>

                    <div className="diet-goal-selector">
                        <label htmlFor="dietGoal">Select Diet Goal:</label>
                        <select
                            id="dietGoal"
                            value={dietGoal}
                            onChange={(e) => setDietGoal(e.target.value)}
                            className="diet-goal-dropdown"
                        >
                            {dietGoalOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {ingredients.length > 0 && (
                        <div className="ingredients-list">
                            <h3>My Ingredients:</h3>
                            <ul className="ingredient-items">
                                {ingredients.map((item, index) => (
                                    <li key={index} className="ingredient-item">
                                        {item}
                                        <button
                                            onClick={() => handleRemoveIngredient(index)}
                                            className="remove-button"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={handleSubmitIngredients}
                                disabled={isSubmitting}
                                className="submit-button"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Ingredients'}
                            </button>
                        </div>
                    )}

                    {message && (
                        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                    
                    {recipe && (
                        <div className="recipe-container">
                            <h2>Your Recipe</h2>
                            <div className="markdown-content">
                                <ReactMarkdown>
                                    {recipe}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home