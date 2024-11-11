import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
