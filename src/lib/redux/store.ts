import { configureStore, combineReducers } from '@reduxjs/toolkit'
import aboutMeReducer from '../../features/AboutMe/aboutMeSlice'

const rootReducer = combineReducers({
    // Add all your reducers here
    // counter: counterReducer,
    aboutMe: aboutMeReducer,

})

export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch