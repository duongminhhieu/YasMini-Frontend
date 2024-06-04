import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Notification } from "../../../types/Notification"


// Define a type for the slice state
interface NotificationState {
    notifications: Notification[],
    totalUnread: number
}

// Define the initial state using that type
const initialState: NotificationState = {
    notifications: [],
    totalUnread: 0
}

export const notificationSlice = createSlice({
    name: 'notification',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setNotifications(state, action: PayloadAction<Notification[]>) {
            state.notifications = action.payload
            state.totalUnread = action.payload.filter(notification => !notification.isRead).length
        },

    },
})

export const { setNotifications } = notificationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNotifications = (state: RootState) => state.notification.notifications;

export default notificationSlice.reducer;