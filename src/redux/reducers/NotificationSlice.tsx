import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TYPE_NotificationData {
    dataId: string;
    dateOfCreation: Date;
    notificationId: string;
    notificationData: string;
    isSeen: boolean;
}

interface TYPE_ModifiedNotificationData extends TYPE_NotificationData {
    field: string;
    color: string;
    data: any;
    schema: any;
}

interface NotificationState {
    notificationList: TYPE_ModifiedNotificationData[];
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
        setNotificationList: (state, action: PayloadAction<TYPE_ModifiedNotificationData[]>) => {
            state.notificationList = action.payload;
        },
        setUnreadNotificationCount: (state, action: PayloadAction<number>) => {
            state.unreadNotificationCount = action.payload;
        }
    },
});

export const { setNotificationList, setUnreadNotificationCount } = NotificationSlice.actions;

export default NotificationSlice.reducer;
