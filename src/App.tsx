import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import StripePage from './layouts/StripePage';
import HomePage from './layouts/HomePage';
import NewPost from './layouts/NewPost';
import ProtectedRoute from './components/ProtectedRoute';
import MyPostsPage from './layouts/MyPostsPage';
import NotificationComponent from './components/NotificationComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
        <NotificationComponent>
        <Navbar />
        <Routes>
            <Route path="/my-posts" element={<MyPostsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<StripePage />} />
            <Route
            path="/home"
            element={
                <ProtectedRoute>
                <HomePage />
                </ProtectedRoute>
            }
            />
            <Route
            path="/new-post"
            element={
                <ProtectedRoute>
                <NewPost />
                </ProtectedRoute>
            }
            />
        </Routes>
        </NotificationComponent>
    </ThemeProvider>
  );
}

export default App;
