import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExhibits, deletePost } from '../store/slices/exhibitActions';
import Post from '../components/Post';
import { RootState, AppDispatch } from '../store/store';
import { useRequest } from 'ahooks';

function StripePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { exhibits, error } = useSelector((state: RootState) => state.exhibits);
    const currentUserId = useSelector((state: RootState) => state.user.userId);

    
    const { loading } = useRequest(() => dispatch(fetchExhibits(1)), {
        refreshDeps: [dispatch],
        onError: (err) => console.error("Error fetching exhibits:", err),
    });

    const handleDelete = (postId: number) => {
        console.log("Attempting to delete post with ID:", postId);
        dispatch(deletePost(postId))
            .unwrap()
            .then(() => {
                console.log(`Post with ID ${postId} successfully deleted`);
            })
            .catch((error) => {
                console.error(`Failed to delete post with ID ${postId}:`, error);
            });
    };

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {Array.isArray(exhibits) && exhibits.length > 0 ? (
                exhibits.map((exhibit: any) => (
                    <Post
                        key={exhibit.id}
                        image={exhibit.imageUrl}
                        description={exhibit.description}
                        username={exhibit.user?.username || "Unknown User"}
                        date={exhibit.createdAt || "Unknown Date"}
                        commentCount={exhibit.commentCount || 0}
                        onDelete={() => handleDelete(exhibit.id)}
                        postId={exhibit.id}
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </>
    );
}

export default StripePage;
