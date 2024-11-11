import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts, deletePost } from '../store/slices/exhibitActions';
import Post from '../components/Post';
import { RootState, AppDispatch } from '../store/store';
import { useRequest } from 'ahooks';

function HomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { myPosts, error } = useSelector((state: RootState) => state.exhibits);

    const { loading } = useRequest(() => dispatch(fetchMyPosts(1)), {
        refreshDeps: [dispatch],
        onError: (err) => console.error("Error fetching posts:", err),
    });

    const handleDelete = async (postId: number) => {
        console.log("Attempting to delete post with ID:", postId); 
        try {
            await dispatch(deletePost(postId));
            console.log("Delete action dispatched");
        } catch (error) {
            console.error("Error in delete action:", error);
        }
    };

    console.log("Rendering myPosts:", myPosts);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {Array.isArray(myPosts) && myPosts.length > 0 ? (
                myPosts.map((post: any) => (
                    <Post
                        key={post.id}
                        image={post.imageUrl}
                        description={post.description}
                        username={post.user?.username || "Unknown User"}
                        date={post.createdAt || "Unknown Date"}
                        commentCount={post.commentCount || 0}
                        onDelete={() => handleDelete(post.id)}
                        postId={post.id} 
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </>
    );
}

export default HomePage;
