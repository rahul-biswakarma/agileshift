import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
    notificationList: TYPE_NOTIFICATION[];
    unreadNotificationCount: number;
}

const initialState: NotificationState = {
    notificationList: [],
    unreadNotificationCount: 0,
};

export const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotificationList: (state, action: PayloadAction<TYPE_NOTIFICATION[]>) => {
            state.notificationList = action.payload;
        },
        setUnreadNotificationCount: (state, action: PayloadAction<number>) => {
            state.unreadNotificationCount = action.payload;
        }
    },
});

export const { setNotificationList, setUnreadNotificationCount } = NotificationSlice.actions;

export default NotificationSlice.reducer;
