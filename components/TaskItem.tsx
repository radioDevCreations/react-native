import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { toggleTaskCompletion } from "../redux/tasksSlice";
import Task from "../entities/Task";
import { AppDispatch } from "redux/store";

interface TaskItemProps {
	task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleToggleCompletion = () => {
		dispatch(toggleTaskCompletion(task.id));
	};

	return (
		<View style={styles.todoItem}>
			<TouchableOpacity
				onPress={handleToggleCompletion}
				style={styles.checkbox}
			>
				{task.completed ? (
					<Text style={styles.checkboxChecked}>✓</Text>
				) : (
					<Text style={styles.checkboxUnchecked}></Text>
				)}
			</TouchableOpacity>
			<Text style={task.completed ? styles.todoTextCompleted : styles.todoText}>
				{task.title}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	todoItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "orange",
	},
	todoText: {
		fontSize: 16,
	},
	todoTextCompleted: {
		fontSize: 16,
		textDecorationLine: "line-through",
		color: "gray",
	},
	checkbox: {
		width: 24,
		height: 24,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 4,
	},
	checkboxChecked: {
		fontSize: 18,
		color: "green",
	},
	checkboxUnchecked: {
		fontSize: 18,
		color: "white",
	},
});

export default TaskItem;
