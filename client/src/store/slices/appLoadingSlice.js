import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: true,
};

export const appLoadingSlice = createSlice({
    name: 'appLoading',
    initialState,
    reducers: {
        setUserLoading: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUserLoading } = appLoadingSlice.actions;
export default appLoadingSlice.reducer;