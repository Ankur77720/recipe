import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/features/user/user.feature'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Authenticate = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {

    console.log("user", user)
    
    if (user.username !== ""|| user.email !== "") {
      return
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
      withCredentials: true
    })
      .then((response) => {

        
        if (response.status === 200) {
          dispatch(setUser({
            username: response.data.user.username,
            email: response.data.user.email
          }))
        }
      })
      .catch((error) => {
        navigate("/login")
      })

  })


  return (
    children
  )
}

export default Authenticate