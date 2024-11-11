// api/commentActions.ts
import axiosInstance from './axiosInstance';

export const fetchComments = async (postId: number) => {
  const response = await axiosInstance.get(`/comments?postId=${postId}`);
  return response.data;
};

export const addComment = async (comment: { postId: number; text: string }) => {
  const response = await axiosInstance.post('/comments', comment);
  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await axiosInstance.delete(`/comments/${commentId}`);
  return response.data;
};
