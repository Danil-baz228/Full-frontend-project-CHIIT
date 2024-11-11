import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

interface Comment {
    id: number;
    text: string;
    createdAt: string;
    user: any;
}

interface CommentsState {
    commentsByExhibit: Record<number, Comment[]>;  
    loading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    commentsByExhibit: {},
    loading: false,
    error: null,
};

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (exhibitId: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);
            return { exhibitId, comments: response.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
        }
    }
);

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ exhibitId, text }: { exhibitId: number; text: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, { text });
            return { exhibitId, comment: response.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
        }
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({ exhibitId, commentId }: { exhibitId: number; commentId: number }, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`);
            return { exhibitId, commentId };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { exhibitId, comments } = action.payload;
                state.commentsByExhibit[exhibitId] = comments;
                state.loading = false;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { exhibitId, comment } = action.payload;
                state.commentsByExhibit[exhibitId] = [
                    ...(state.commentsByExhibit[exhibitId] || []),
                    comment,
                ];
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const { exhibitId, commentId } = action.payload;
                state.commentsByExhibit[exhibitId] = state.commentsByExhibit[exhibitId].filter(
                    (comment) => comment.id !== commentId
                );
            });
    },
});

export default commentsSlice.reducer;
