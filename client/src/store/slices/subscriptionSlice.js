import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    subscriberLists: [],
    subscribedChannelLists: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 0,
    totalChannels: 0,
    hasNextPage: false,
};

const toggleSubscription = createAsyncThunk(
    "/subscriptions/channelId",
    async (channelId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(`/subscriptions/u/${channelId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const getUserChannelSubscribers = createAsyncThunk(
    "/subscriptions/c/channelId",
    async (
        {
            channelId,
            queryParams,
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.get(`/subscriptions/c/${channelId}`, {
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

const getSubscribedChannels = createAsyncThunk(
    "/subscriptions/c/subscriberId",
    async (
        {
            subscriberId,
            queryParams,
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.get(`/subscriptions/c/${subscriberId}`, {
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

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserChannelSubscribers.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.hasNextPage = false;
            })
            .addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
                const new_channelSubscribers = action.payload.data?.result?.docs;
                state.subscriberLists =
                    action.payload.data?.result?.page == 1
                        ? new_channelSubscribers
                        : [...state.subscriberLists, ...new_channelSubscribers];
                state.loading = false;
                state.error = null;
                state.currentPage = action.payload.data?.result?.page;
                state.totalChannels = action.payload.data?.result?.totalDocs || 0;
                state.totalPages = action.payload.data?.result?.totalPages;
                state.hasNextPage = action.payload.data?.result?.hasNextPage;
            })
            .addCase(getUserChannelSubscribers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch subscriber lists";
            })

            .addCase(getSubscribedChannels.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.hasNextPage = false;
            })
            .addCase(getSubscribedChannels.fulfilled, (state, action) => {
                const new_subscribedChannels = action.payload.data?.channels;

                // console.log(new_subscribedChannels);

                state.subscribedChannelLists =
                    action.payload.data?.result?.page == 1
                        ? new_subscribedChannels
                        // : [...state.subscribedChannelLists, ...new_subscribedChannels];
                        : new_subscribedChannels;
                state.loading = false;
                state.error = null;
                state.currentPage = action.payload.data?.result?.page;
                state.totalChannels = action.payload.data?.result?.totalDocs || 0;
                state.totalPages = action.payload.data?.result?.totalPages;
                state.hasNextPage = action.payload.data?.result?.hasNextPage;
            })
            .addCase(getSubscribedChannels.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch subscription lists";
            });
    },
});

export default subscriptionSlice.reducer;
export const { } = subscriptionSlice.actions;
export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };