import axiosInstance from "../../helper/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedVideo: [],
};

const toggleVideoLike = createAsyncThunk(
    "/likes/video/videoId",
    async (videoId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const toggleCommentLike = createAsyncThunk(
    "/likes/comment/commentId",
    async (commentId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const toggleTweetLike = createAsyncThunk(
    "/likes/tweet/tweetId",
    async (tweetId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(`/likes/tweet/${tweetId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const getLikedVideo = createAsyncThunk(
    "/likes/video",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/likes/videos");
            // console.log(res.data?.data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// unnecessary but dont delete
// const getTotalLikesByAnyId = createAsyncThunk(
//     "/likes/total/anyId",
//     async ({ anyId, type }, { rejectWithValue }) => {
//         try {
//             // console.log(anyId, type);
//             const res = await axiosInstance.get(`/likes/${anyId}?type=${type}`);
//             // console.log(res.data);
//             return res.data;
//         } catch (error) {
//             if (!error.response) {
//                 throw error;
//             }
//             return rejectWithValue(error?.response?.data);
//         }
//     }
// );

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLikedVideo.pending, (state) => {
                state.likedVideo = [];
            })
            .addCase(getLikedVideo.fulfilled, (state, action) => {
                console.log(action.payload?.data);
                state.likedVideo = action.payload?.data;
            })
            .addCase(getLikedVideo.rejected, (state) => {
                state.likedVideo = [];
            });

        // do not uncomment this
        // builder
        //     .addCase(getTotalLikesByAnyId.pending, (state) => {
        //         state.totalLikes = 0;
        //     })
        //     .addCase(getTotalLikesByAnyId.fulfilled, (state, action) => {
        //         state.totalLikes = action.payload?.data?.totalLikes;
        //     })
        //     .addCase(getTotalLikesByAnyId.rejected, (state) => {
        //         state.totalLikes = 0;
        //     });

    },
});

export default likeSlice.reducer;
export const { } = likeSlice.actions;
export {
    toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideo,
    // getTotalLikesByAnyId 
};