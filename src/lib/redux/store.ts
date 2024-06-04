import { configureStore, combineReducers } from '@reduxjs/toolkit'
import aboutMeReducer from '../../features/user/AboutMe/aboutMeSlice'
import authReducer from './auth/authSlice'
import cartReducer from './cart/cartSlice'
import notificationReducer from './notification/notificationSlice'
import { apiSlice } from './api/apiSlice'

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    aboutMe: aboutMeReducer,
    auth: authReducer,
    cart: cartReducer,
    notification: notificationReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

