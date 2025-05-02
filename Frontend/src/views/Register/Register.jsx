import React, { useState } from 'react'
import './Register.css'

const Register = () => {

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return (
        <div className="auth-section">
  
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                required value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input

                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Register</button>
        </form>

        </div>
    )


}
export default Register