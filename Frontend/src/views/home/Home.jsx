import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import '../Register/Register.css'

const Home = () => {
    const user = useSelector((state) => state.user);
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleAddIngredient = (e) => {
        e.preventDefault();
        if (ingredient.trim()) {
            setIngredients([...ingredients, ingredient.trim()]);
            setIngredient('');
        }
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
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
                ingredients 
            }, {
                withCredentials: true
            });

            console.log('Response from server:', response.data);
            
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
        <div className="auth-section">
            <div style={{ width: '400px', maxWidth: '90%' }}>
                {user.username ? <h1>Welcome, {user.username}!</h1> : <h1>Home</h1>}
                
                <div style={{ marginTop: '2rem' }}>
                    <h2>Add Ingredients</h2>
                    <p>Enter ingredients one by one and submit when done</p>
                    
                    <form onSubmit={handleAddIngredient} style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                placeholder="Enter an ingredient"
                                style={{ flex: 1 }}
                            />
                            <button type="submit">Add</button>
                        </div>
                    </form>
                    
                    {ingredients.length > 0 && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <h3>My Ingredients:</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
                                {ingredients.map((item, index) => (
                                    <li key={index} style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        padding: '0.5rem',
                                        margin: '0.5rem 0',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '0.5rem'
                                    }}>
                                        {item}
                                        <button 
                                            onClick={() => handleRemoveIngredient(index)}
                                            style={{ 
                                                background: '#ff6b6b',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.35rem',
                                                padding: '0.25rem 0.5rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            
                            <button 
                                onClick={handleSubmitIngredients} 
                                disabled={isSubmitting}
                                style={{ width: '100%', marginTop: '1rem' }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Ingredients'}
                            </button>
                        </div>
                    )}
                    
                    {message && (
                        <div style={{ 
                            marginTop: '1rem', 
                            padding: '0.75rem', 
                            backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
                            color: message.includes('success') ? '#155724' : '#721c24',
                            borderRadius: '0.5rem'
                        }}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home