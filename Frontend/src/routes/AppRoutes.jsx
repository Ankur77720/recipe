import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from '../views/Register/Register'

const AppRoutes = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Home</h1>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoutes