import axiosInstance from '../../api/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchExhibits = createAsyncThunk(
    'exhibits/fetchExhibits',
    async (page: number = 1) => {
        const response = await axiosInstance.get(`/api/exhibits`, {
            params: { page },
        });
        console.log("Fetched exhibits:", response.data); 
        return {
            exhibits: response.data.data,
            page: response.data.page,
            lastPage: response.data.lastPage,
        };
    }
);



export const fetchMyPosts = createAsyncThunk(
    'exhibits/fetchMyPosts',
    async (page: number = 1) => {
        const response = await axiosInstance.get(`/api/exhibits/my-posts`, {
            params: { page },
        });
        console.log("Fetched my posts:", response.data); 
        return response.data.data; 
    }
);


export const createPost = createAsyncThunk(
    'exhibits/createPost',
    async (postData: { image: File; description: string }, thunkAPI) => {  
        try {
            const formData = new FormData();
            formData.append('image', postData.image);  
            formData.append('description', postData.description);

            const response = await axiosInstance.post('/api/exhibits', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create post');
        }
    }
);

export const deletePost = createAsyncThunk(
    'exhibits/deletePost',
    async (postId: number, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/api/exhibits/${postId}`);
            return postId;
        } catch (error) {
            return rejectWithValue('Failed to delete post');
        }
    }
);
