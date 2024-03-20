import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/videoSlice";
import appLoadingSlice from "./slices/appLoadingSlice";
import authSlice from "./slices/authSlice";
import playlistSlice from "./slices/playlistSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        // subscription: () => { },
        video: videoSlice,
        // tweet: () => { },
        playlist: playlistSlice,
        // like: () => { },
        // comment: () => { },
        // sidebar: () => { },
        appLoading: appLoadingSlice,
    },
})

