import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/videoSlice";
import appLoadingSlice from "./slices/appLoadingSlice";
import authSlice from "./slices/authSlice";
import playlistSlice from "./slices/playlistSlice";
import tweetSlice from "./slices/tweetSlice";
import sidebarSlice from "./slices/sidebarSlice";
import subscriptionSlice from "./slices/subscriptionSlice";
import likeSlice from "./slices/likeSlice";
import commentSlice from "./slices/commentSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        subscription: subscriptionSlice,
        video: videoSlice,
        tweet: tweetSlice,
        playlist: playlistSlice,
        like: likeSlice,
        comment: commentSlice,
        sidebar: sidebarSlice,
        appLoading: appLoadingSlice,
    },
})

