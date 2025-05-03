import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/user/user.feature"

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})