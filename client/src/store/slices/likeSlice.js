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
            const res = await axiosInstance.post(`/likes/comment/${commentId}`);
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
            const res = await axiosInstance.get("/likes/video");
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

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
                state.likedVideo = action.payload?.data?.likedVideo;
            })
            .addCase(getLikedVideo.rejected, (state) => {
                state.likedVideo = [];
            });

    },
});

export default likeSlice.reducer;
export const { } = likeSlice.actions;
export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideo };