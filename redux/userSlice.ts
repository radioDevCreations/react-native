import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userData: null,
		loading: false,
		error: null,
	},
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},
		userLoaded: (state, action) => {
			state.loading = false;
			state.userData = action.payload;
		},
		userLoadFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		pictureLoaded: (state) => {
			state.loading = false;
		},
	},
});

export const { startLoading, userLoaded, userLoadFailed, pictureLoaded } =
	userSlice.actions;

export default userSlice.reducer;
