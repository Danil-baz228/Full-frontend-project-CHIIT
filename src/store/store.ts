import { configureStore } from '@reduxjs/toolkit';
import exhibitsReducer from './slices/exhibitsSlice';
import userReducer from './slices/userSlice';
import commentsReducer from './slices/commentsSlice'; 

const store = configureStore({
    reducer: {
        exhibits: exhibitsReducer,
        user: userReducer,
        comments: commentsReducer, 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
