import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts, deletePost } from '../store/slices/exhibitActions'; 
import Post from '../components/Post';
import { RootState, AppDispatch } from '../store/store';
import { useRequest } from 'ahooks';

function MyPostsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { myPosts, error } = useSelector((state: RootState) => state.exhibits);

  
    const { loading } = useRequest(() => dispatch(fetchMyPosts(1)), {
        refreshDeps: [dispatch],
        onError: (err) => console.error("Error fetching my posts:", err),
    });

    return (
        <div>
            <h1>My Posts</h1>
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
                        onDelete={() => dispatch(deletePost(post.id))}
                        postId={post.id} 
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
}

export default MyPostsPage;
