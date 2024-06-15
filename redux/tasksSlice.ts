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
		toggleTaskCompletion(state, action: PayloadAction<number>) {
			const task = state.data.find((task) => task.id === action.payload);
			if (task) {
				task.completed = !task.completed;
			}
		},
	},
});

export const { tasksLoaded, toggleTaskCompletion } = tasksSlice.actions;

export default tasksSlice.reducer;
