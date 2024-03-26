import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    tweet: null,
    tweets: [],
};

const createTweet = createAsyncThunk(
    "/tweets/add-tweet",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/tweets", data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const updateTweet = createAsyncThunk(
    "/tweets/update-tweet/tweetId",
    async (
        { data, tweetId },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.patch(`/tweets/${tweetId}`, data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const deleteTweet = createAsyncThunk(
    "/tweets/delete-tweet/tweetId",
    async (tweetId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`/tweets/${tweetId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const getTweetById = createAsyncThunk(
    "/tweets/tweetId",
    async (tweetId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/tweets/${tweetId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const getUserTweets = createAsyncThunk(
    "/tweets/user/userId",
    async (
        { userId, queryParams },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.get(`/tweets/user/${userId}`, {
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

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        setTweets: (state, action) => {
            state.tweets = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateTweet.fulfilled, (state, action) => {
                state.tweet = action.payload?.data?.tweet;
            })

            .addCase(getTweetById.pending, (state) => {
                state.tweet = null;
            })
            .addCase(getTweetById.fulfilled, (state, action) => {
                state.tweet = action.payload?.data?.tweet;
            })
            .addCase(getTweetById.rejected, (state) => {
                state.tweet = null;
            })

            .addCase(getUserTweets.fulfilled, (state, action) => {
                const newTweets = action.payload?.data?.result?.docs;
                state.tweets =
                    action.payload?.data?.result?.page === 1
                        ? newTweets
                        : [...state.tweets, ...newTweets];
            })
            .addCase(getUserTweets.rejected, (state) => {
                state.tweets = [];
            });
    },
});

export default tweetSlice.reducer;
export const { setTweets } = tweetSlice.actions;
export { createTweet, updateTweet, deleteTweet, getTweetById, getUserTweets };