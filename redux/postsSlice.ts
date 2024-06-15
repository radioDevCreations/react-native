import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataLoader from "DataLoader";
import Post from "entities/Post";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const loader = DataLoader.getInstance();
	const response = await loader.fetchData(
		"https://jsonplaceholder.typicode.com/posts"
	);
	return response;
});

interface PostsState {
	loading: boolean;
	posts: Post[];
	postsNumber: number;
	error: string | null;
}

const initialState: PostsState = {
	loading: false,
	posts: [],
	postsNumber: 0,
	error: null,
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false;
				state.posts = action.payload;
				state.postsNumber = action.payload.length;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch posts";
			});
	},
});

export default postsSlice.reducer;
