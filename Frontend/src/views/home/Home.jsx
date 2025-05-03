import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const user = useSelector((state) => state.user);
    console.log(user);
    
    return (
        <div>
            {user.username ? <h1>Welcome, {user.username}!</h1> : <h1>home</h1>}
        </div>
    )
}

export default Home