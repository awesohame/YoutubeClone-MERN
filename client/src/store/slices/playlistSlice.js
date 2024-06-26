import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    playlist: null
}

const createPlaylist = createAsyncThunk(
    "/playlist",
    async (
        data,
        { rejectWithValue }
    ) => {
        try {
            //playlist post
            const res = await axiosInstance.post("/playlist", data);
            return res?.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const getUserPlaylists = createAsyncThunk(
    "/playlist/user/userid",
    async (
        {
            userId,
            queryParams,
        },
        { rejectWithValue }
    ) => {
        try {
            //get user playlist
            const res = await axiosInstance.get(`/playlist/user/${userId}`, {
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

const getPlaylist = createAsyncThunk(
    "/playlist/playlistId",
    async (
        playlistId,
        { rejectWithValue }
    ) => {
        try {
            //get playlist by id
            const res = await axiosInstance.get(`/playlist/${playlistId}`);
            // console.log(res?.data)
            return res?.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

// const getUserPlaylistVideos = createAsyncThunk(
//     "/playlist/get/playlistId/videos",
//     async (
//         {
//             playlistId,
//             queryParams,
//         },
//         { rejectWithValue }
//     ) => {
//         try {
//             //get playlist videos
//             const res = await axiosInstance.get(`/playlist/get/${playlistId}/videos`, {
//                 params: queryParams,
//             });
//             return res?.data;
//         } catch (error) {
//             if (!error.response) {
//                 throw error;
//             }
//             return rejectWithValue(error?.response?.data);
//         }
//     }
// );

const addVideoToPlaylist = createAsyncThunk(
    "/playlist/add/playlistId/video",
    async (
        {
            playlistId,
            videoId,
        },
        { rejectWithValue }
    ) => {
        try {
            //add video to playlist
            const res = await axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`);
            return res?.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const removeVideoFromPlaylist = createAsyncThunk(
    "/playlists/remove/playlistId/videoId",
    async (
        { playlistId, videoId },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.delete(
                `/playlists/remove/${videoId}/${playlistId}`
            );
            return res?.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const deletePlaylist = createAsyncThunk(
    "/playlists/playlistId",
    async (playlistId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`/playlist/${playlistId}`);
            return res?.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const updatePlaylist = createAsyncThunk(
    "/playlists/update/playlistId",
    async (
        {
            playlistId,
            data,
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosInstance.patch(`/playlists/${playlistId}`, data);
            return res?.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPlaylist.pending, (state) => {
                state.playlist = null;
            })
            .addCase(getPlaylist.fulfilled, (state, action) => {
                // console.log(action.payload?.data)
                state.playlist = action.payload?.data;
            })
            .addCase(getPlaylist.rejected, (state) => {
                state.playlist = null;
            });
    },
});


export default playlistSlice.reducer;
export const { } = playlistSlice.actions;
export {
    createPlaylist,
    getUserPlaylists,
    getPlaylist,
    // getUserPlaylistVideos,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};
