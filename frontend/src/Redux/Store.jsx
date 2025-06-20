import persistReducer from "redux-persist/es/persistReducer"
import sessionStorage from "redux-persist/es/storage/session"
import { AuthSlice } from "./AuthSlice"
import { configureStore,combineReducers } from "@reduxjs/toolkit"
import persistStore from "redux-persist/es/persistStore"
import {VideoSlice} from "./VideoSlice"





const userpersistconfig = {
    key:'Auth',
    storage:sessionStorage
}


const persistConfigUser = persistReducer(userpersistconfig,AuthSlice.reducer)

const rootReducer = combineReducers({
    Auth:persistConfigUser,
    Video:VideoSlice.reducer
})
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })  
})

export const persistor = persistStore(store)