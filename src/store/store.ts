import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import type { UserState } from '../types';

interface RootStateShape {
  users: UserState;
}

const loadState = (): RootStateShape | undefined => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (err) {
  }
};


const rootReducer = combineReducers({
  users: userReducer,
});

// 4. Налаштовуємо стор
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState() as any,
});


store.subscribe(() => {
  saveState({
    users: store.getState().users
  });
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;