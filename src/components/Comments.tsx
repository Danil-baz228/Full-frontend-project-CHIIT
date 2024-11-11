import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addComment, fetchComments, deleteComment } from '../store/slices/commentsSlice';
import { useRequest } from 'ahooks';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Divider, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CommentsProps {
    exhibitId: number;
}

const Comments: React.FC<CommentsProps> = ({ exhibitId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootState) => state.comments.commentsByExhibit[exhibitId] || []);
    const loading = useSelector((state: RootState) => state.comments.loading);
    const error = useSelector((state: RootState) => state.comments.error);
    const [content, setContent] = useState('');

    useRequest(() => dispatch(fetchComments(exhibitId)), {
        refreshDeps: [exhibitId],
        onError: (err) => console.log("Failed to fetch comments:", err),
    });

    const handleAddComment = async () => {
        if (content) {
            await dispatch(addComment({ exhibitId, text: content }));
            setContent('');
        } else {
            console.log("Content is empty");
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        await dispatch(deleteComment({ exhibitId, commentId }));
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: '16px', borderRadius: '8px', boxShadow: 3, backgroundColor: '#fff' }}>
            <Typography variant="h5" gutterBottom>
                Comments
            </Typography>
            {loading && <CircularProgress size={24} />}
            {error && <Typography color="error">{error}</Typography>}
            <List>
                {comments.map((comment) => (
                    <React.Fragment key={comment.id}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" color="error" onClick={() => handleDeleteComment(comment.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={comment.text} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Add a comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddComment} disabled={!content.trim()}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default Comments;
