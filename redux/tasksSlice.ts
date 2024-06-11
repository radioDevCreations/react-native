import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
	id: number;
	title: string;
	completed: boolean;
}

interface TasksState {
	data: Task[];
}

const initialState: TasksState = {
	data: [],
};

export const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		tasksLoaded: (state, action: PayloadAction<Task[]>) => {
			state.data = action.payload;
		},
	},
});

export const { tasksLoaded } = tasksSlice.actions;

export default tasksSlice.reducer;
