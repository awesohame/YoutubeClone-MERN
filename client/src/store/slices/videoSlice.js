import axiosInstance from "../../helper/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    video: [],
    videos: [],
    loading: false,
    error: null,
    currPage: 0,
    totalDocs: 0,
    totalPages: 0,
    hasNextPage: false,
};

const createVideo = createAsyncThunk(
    "/videos/create",
    async (
        data,
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.post("/videos", data, {
                headers: { "Content-Type": "multipart/form-data" },
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

const updateVideo = createAsyncThunk(
    "/videos/update/videoId",
    async (
        {
            videoId,
            data,
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.patch(`/videos/${videoId}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
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

const getVideoByVideoId = createAsyncThunk(
    "/videos/update/videoId",
    async (videoId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/videos/${videoId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const getAllVideos = createAsyncThunk(
    "/videos/getAll",
    async (queryParams, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/videos", {
                params: queryParams,
            });
            return res?.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.hasNextPage = false;
            })

            .addCase(getAllVideos.fulfilled, (state, action) => {
                state.loading = false;
                const newVideos = action.payload.data?.docs || [];
                state.videos =
                    action.payload.data?.page === 1
                        ? newVideos
                        : [...state.videos, ...newVideos];
                state.currPage = action.payload.data?.page;
                state.totalDocs = action.payload.data?.totalDocs || 0;
                state.totalPages = action.payload.data?.totalPages;
                state.hasNextPage = action.payload.data?.hasNextPage;
            })

            .addCase(getAllVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch videos";
            });
    },
});

export default videoSlice.reducer;
export const { setVideos } = videoSlice.actions;
export { createVideo, updateVideo, getVideoByVideoId, getAllVideos };