import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/UserSlice'

const store = configureStore({
    reducer: {
        users: userReducer
    }
})

export default store