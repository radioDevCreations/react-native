import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { tasksLoaded } from "../redux/tasksSlice";
import DataLoader from "../DataLoader";

interface Task {
	id: number;
	title: string;
	completed: boolean;
}

interface RootState {
	tasks: {
		data: Task[];
	};
}

const MyTasksScreen: React.FC = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state: RootState) => state.tasks.data);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const loader = DataLoader.getInstance();
				const todos = await loader.fetchData(
					"https://jsonplaceholder.typicode.com/todos"
				);
				dispatch(tasksLoaded(todos));
			} catch (error) {
				console.error("Failed to fetch tasks", error);
			}
		};
		fetchTasks();
	}, [dispatch]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Todo List</Text>
			<FlatList
				data={tasks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.todoItem}>
						<Text
							style={
								item.completed ? styles.todoTextCompleted : styles.todoText
							}
						>
							{item.title}
						</Text>
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	todoItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	todoText: {
		fontSize: 16,
	},
	todoTextCompleted: {
		fontSize: 16,
		textDecorationLine: "line-through",
		color: "gray",
	},
});

export default MyTasksScreen;
