import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tasksReducer from "./tasksSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		tasks: tasksReducer,
		posts: postsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
