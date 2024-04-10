import axiosInstance from "../../helper/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    videoComment: null,
    tweetComment: null,
};

const addCommentToVideo = createAsyncThunk(
    "/add-comment/video/videoId",
    async (
        { data, videoId },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.post(`/comments/${videoId}`, data);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const addCommentToTweet = createAsyncThunk(
    "/add-comment/tweet/tweetId",
    async (
        { data, tweetId },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.post(`/comments/tweet/${tweetId}`, data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const updateComment = createAsyncThunk(
    "/update-comment/commentId",
    async (
        { data, commentId },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.patch(`/comments/${commentId}`, data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const deleteComment = createAsyncThunk(
    "/delete-comment/commentId",
    async (commentId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`/comments/${commentId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const getVideoComment = createAsyncThunk(
    "/get-comment/video/videoId",
    async (
        { videoId, queryParams },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.get(`/comments/${videoId}`, {
                params: queryParams,
            });
            // console.log(res.data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const getTweetComment = createAsyncThunk(
    "/get-comment/tweet/tweetId",
    async (
        { tweetId, queryParams },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.get(`/comments/tweet/${tweetId}`, {
                params: queryParams,
            });
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideoComment.fulfilled, (state, action) => {
            state.videoComment = action.payload?.result;
        });
        builder.addCase(getVideoComment.rejected, (state, action) => {
            state.videoComment = null;
        });

        builder.addCase(addCommentToVideo.fulfilled, (state, action) => {
            state.videoComment = action.payload?.data;
        }
        );
        builder.addCase(addCommentToVideo.rejected, (state, action) => {
            state.videoComment = null;
        });
    },
});

export default commentSlice.reducer;
export const { } = commentSlice.actions;
export {
    addCommentToVideo,
    addCommentToTweet,
    updateComment,
    deleteComment,
    getVideoComment,
    getTweetComment,
};