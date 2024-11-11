
import axiosInstance from '../api/axiosInstance';

export const registerUser = async (userData: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
