import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import notificationReducer from 'store/notification';
import puzzleReducer from 'store//puzzle';

export const store = configureStore({
    reducer: {
        puzzle: puzzleReducer.reducer,
        notification: notificationReducer.reducer
    }
});

// Use throughout app instead of plain `useDispatch` and `useSelector`
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
