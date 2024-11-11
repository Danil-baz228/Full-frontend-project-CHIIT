import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken, removeAuthToken } from '../../api/axiosInstance';

interface UserState {
    userId: number | null;
    userName: string | null;
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const saveToken = (token: string, userId: number | null) => {
    localStorage.setItem('token', token);
    if (userId !== null && userId !== undefined) {
        localStorage.setItem('userId', userId.toString());
    }
    setAuthToken(token);
};

const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    removeAuthToken();
};

const loadToken = (): string | null => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }
    return token;
};

const loadUserId = (): number | null => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
};

const initialState: UserState = {
    userId: loadUserId(),  
    userName: null,
    isAuthenticated: !!loadToken(),
    token: loadToken(),
    loading: false,
    error: null,
};


export const login = createAsyncThunk(
    'user/login',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', credentials);
            console.log("Full server response:", response);  
            console.log("Response data:", response.data);    

            const { access_token: token, userId, userName } = response.data; 

            if (token) {
                saveToken(token, userId);
                console.log("Response data:", token, userId);
                return { token, userId, userName };
            } else {
                console.error("Token not found in server response");
                return rejectWithValue("Token not found");
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);


export const register = createAsyncThunk(
    'user/register',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/users/register', credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            removeToken();
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
            state.userName = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload?.token || null;
                state.userId = action.payload?.userId || null;  
                state.userName = action.payload?.userName || null; 
                
                console.log("Login fulfilled - userId:", state.userId);  
                console.log("Login fulfilled - userName:", state.userName);
            })
            
            
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.token = null;
                state.userId = null;
                state.userName = null;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
