import { createSlice } from "@reduxjs/toolkit";


export const VideoSlice = createSlice({
    name:"Video",
    initialState:{
        videos:[],
    },
    reducers:{
        SetVideos:(state,action)=>{
            state.videos = action.payload
        }
    }
})

export const {SetVideos} = VideoSlice.actions
export default VideoSlice.reducer