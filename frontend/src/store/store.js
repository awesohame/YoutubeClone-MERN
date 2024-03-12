import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./slices/videoSlice";
import appLoadingReducer from "./slices/appLoadingSlice";

export const store = configureStore({
    reducer: {
        // auth: () => { },
        // subscription: () => { },
        video: videoReducer,
        // tweet: () => { },
        // playlist: () => { },
        // like: () => { },
        // comment: () => { },
        // sidebar: () => { },
        appLoading: appLoadingReducer,
    },
})

