import React from 'react';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExhibits } from '../store/slices/exhibitActions';
import { RootState, AppDispatch } from '../store/store';
import { useRequest } from 'ahooks';
import { Box } from '@mui/material';

const SOCKET_SERVER_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/' + 'notifications';

const NotificationComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = useSelector((state: RootState) => state.exhibits.currentPage);

  useRequest(
    () =>
      new Promise<void>((resolve) => {
        const socket = io(SOCKET_SERVER_URL, {
          transports: ['websocket'],
          autoConnect: true,
          reconnection: true,
          reconnectionDelay: 1000,
        });

        socket.on('newPost', (data) => {
          toast(`New post by ${data.user}: ${data.message}`, { duration: 3000 });

          if (location.pathname === '/' && currentPage === 1) {
            dispatch(fetchExhibits(1));
          }
        });

        resolve();

        return () => {
          socket.disconnect();
        };
      }),
    {
      refreshDeps: [dispatch, currentPage, location.pathname],
      onError: (error) => console.error("Socket connection error:", error),
    }
  );

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: 1 }}>
      {children}
      <Toaster position="bottom-right" reverseOrder={false} />
    </Box>
  );
};

export default NotificationComponent;
