import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: [{
        name: "Video 1",
        url: "https://www.youtube.com/watch?v=4A2mWqLUpzw"
    }]
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        addVideo: (state, action) => {
            const video = {
                name: action.payload.name,
                url: action.payload.url
            }
            state.videos.push(video);
        },
        removeVideo: (state, action) => {
            state.videos = state.videos.filter(video => video.url !== action.payload.url)
        }
    }
})

export const { addVideo, removeVideo } = videoSlice.actions;
export default videoSlice.reducer;