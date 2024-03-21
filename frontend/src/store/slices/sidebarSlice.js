import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: true,
    isOpenInMobile: false
}

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        onClose: (state) => {
            state.isOpen = false;
        },
        onToggle: (state) => {
            state.isOpen = !state.isOpen;
            state.isOpenInMobile = !state.isOpenInMobile;
        },
        resetBydefault: (state) => {
            state.isOpen = true;
            state.isOpenInMobile = false;
        },
    },
});

export const { onClose, onToggle, resetBydefault } = sidebarSlice.actions;
export default sidebarSlice.reducer;