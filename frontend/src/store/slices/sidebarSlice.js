import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
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
        },
    },
});

export const { onClose, onToggle } = sidebarSlice.actions;
export default sidebarSlice.reducer;