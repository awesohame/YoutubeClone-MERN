import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/videoSlice";
import appLoadingSlice from "./slices/appLoadingSlice";
import authSlice from "./slices/authSlice";
import playlistSlice from "./slices/playlistSlice";
import tweetSlice from "./slices/tweetSlice";
import sidebarSlice from "./slices/sidebarSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        // subscription: () => { },
        video: videoSlice,
        tweet: tweetSlice,
        playlist: playlistSlice,
        // like: () => { },
        // comment: () => { },
        sidebar: sidebarSlice,
        appLoading: appLoadingSlice,
    },
})

