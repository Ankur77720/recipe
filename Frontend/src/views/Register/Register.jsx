import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/features/user/user.feature'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post(`/api/v1/user/register`, {
            username,email,password
        },{
            withCredentials:true
        })

        dispatch(setUser({
            username: response.data.user.username,
            email: response.data.user.email
        }))

        navigate("/home")
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