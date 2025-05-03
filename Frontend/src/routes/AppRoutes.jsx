import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from '../views/Register/Register'
import Home from '../views/home/Home'
import Login from '../views/Login/Login'
import Authenticate from '../components/Authenticate'

const AppRoutes = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Home</h1>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Authenticate><Home /></Authenticate>} />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoutes