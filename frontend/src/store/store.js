import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./slices/videoSlice";
import appLoadingReducer from "./slices/appLoadingSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
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

