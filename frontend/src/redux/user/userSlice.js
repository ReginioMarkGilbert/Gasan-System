import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    currentUser: null,
    loading: false,
    error: null
};

// create slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        }
    }
});

// export actions
export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;