import { createSlice } from '@reduxjs/toolkit';
import React, { createContext } from 'react';
import persistReducer from 'redux-persist/es/persistReducer';



export const AuthSlice = createSlice({
    name:"Auth",
    initialState:{
        user:null,
    },
    reducers:{
        SetUser:(state,action)=>{
            state.user = action.payload
        }

    }
})

export const {SetUser} = AuthSlice.actions
export const persistconfig = {
    key:"Auth",
    storage:sessionStorage
}
export const persistedReducer = persistReducer(persistconfig,AuthSlice.reducer)
export default persistedReducer
