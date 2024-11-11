import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Box, Divider, IconButton } from '@mui/material';
import Comments from './Comments';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';

interface PostProps {
    image: string;
    description: string;
    onDelete?: () => void;
    onShowComments?: () => void;
    username: string;
    date: string;
    commentCount: number;
    postId: number; 
}

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com';

function Post({ image, description, onDelete, onShowComments, username, date, commentCount, postId }: PostProps) {
    const imageUrl = image ? `${BASE_URL}${image}` : '';

    return (
        <Card sx={{ maxWidth: 600, margin: '16px auto', borderRadius: '12px', boxShadow: 3 }}>
            {imageUrl && (
                <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt="Post image"
                    sx={{ borderRadius: '12px 12px 0 0' }}
                />
            )}
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" fontWeight="bold">
                        {username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {date}
                    </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    size="small"
                    startIcon={<CommentIcon />}
                    onClick={onShowComments}
                    sx={{ color: 'primary.main' }}
                >
                    {commentCount} Comments
                </Button>
                {onDelete && (
                    <IconButton color="error" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </CardActions>
            <Divider />
            <Comments exhibitId={postId} />
        </Card>
    );
}

export default Post;
