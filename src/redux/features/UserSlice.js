import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name: 'users',
    initialState: {
       listUser:[],
       isFetching: false,
       error:false
    },
    reducers: {
        // Get users
        getUserStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false
            state.error = false
            state.listUser = action.payload
        },
        getUserFailed: (state) => {
            state.isFetching = false
            state.error = true
        },
        // Add user
        addUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addUserSuccess: (state, action) =>{
            state.isFetching = false
            state.error = false
            state.user = [...state.user, action.payload]
            
        },
        addUserFailed: (state) => {
            state.isFetching = false
            state.error = true
        },

        //Del user
        delUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        delUserSuccess:(state,action) => {
            state.isFetching = false
            state.users.splice(state.users.findIndex((item) => item._id === action.payload),
            1)
        },
        delUserFailed:(state) => {
            state.isFetching = false
            state.error = true
        },

        //Edit user
        editUserStart: (state, action) => {
            state.isFetching = false
        },
        editUserSuccess:(state,action) => {
        },
        editUserFailed:(state) => {
            state.isFetching = false
            state.error=true
        }
    }
    
    
})

export const {
    getUserStart,
    getUserSuccess,
    getUserFailed,
    addUserStart,
    addUserSuccess,
    addUserFailed,
    delUserStart,
    delUserSuccess,
    delUserFailed,
    editUserStart,
    editUserSuccess,
    editUserFailed
} = UserSlice.actions
export default UserSlice.reducer