// src/hooks.ts
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';

// Используем типизированный `AppDispatch` вместо стандартного `dispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;
