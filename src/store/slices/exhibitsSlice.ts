import { createSlice } from '@reduxjs/toolkit';
import { fetchExhibits, fetchMyPosts, deletePost } from './exhibitActions';

interface ExhibitsState {
    exhibits: any[];
    myPosts: any[];
    loading: boolean;
    error: string | null;
    currentPage: number | null; 
    lastPage: number | null;    
}


const initialState: ExhibitsState = {
    exhibits: [],
    myPosts: [],
    loading: false,
    error: null,
    currentPage: null,
    lastPage: null,    
};


const exhibitsSlice = createSlice({
    name: 'exhibits',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExhibits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExhibits.fulfilled, (state, action) => {
                state.loading = false;
                state.exhibits = action.payload.exhibits;
                state.currentPage = action.payload.page;
                state.lastPage = action.payload.lastPage;
            })
            
            .addCase(fetchExhibits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch exhibits';
            })
            .addCase(fetchMyPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.myPosts = action.payload;
            })
            .addCase(fetchMyPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch my posts';
            })
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("Delete post pending...");
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                const postId = action.payload;
                console.log(`Delete post fulfilled for postId: ${postId}`);
                state.myPosts = state.myPosts.filter(post => post.id !== postId);
                state.exhibits = state.exhibits.filter(post => post.id !== postId);
                console.log("Updated myPosts and exhibits after deletion");
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete post';
                console.error("Delete post rejected:", state.error);
            });
    },
});

export default exhibitsSlice.reducer;
