import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    isNotificationVisible: boolean
}

const initialState: InitialState = {
    isNotificationVisible: false
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state: InitialState) => {
            state.isNotificationVisible = true;
        },

        disableNotification: (state: InitialState) => {
            state.isNotificationVisible = false;
        }
    }
});

export const { showNotification, disableNotification } = notificationSlice.actions;
export default notificationSlice;
