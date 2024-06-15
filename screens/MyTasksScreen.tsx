import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { tasksLoaded, toggleTaskCompletion } from "../redux/tasksSlice";
import DataLoader from "../DataLoader";
import GUIDGenerator from "GUIDGenerator";
import Task from "../entities/Task";
import { AppDispatch } from "redux/store";
import TaskItem from "components/TaskItem";

interface RootState {
	tasks: {
		data: Task[];
	};
}

const MyTasksScreen: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const tasks = useSelector((state: RootState) => state.tasks.data);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [guid, setGUID] = useState("");
	const tasksPerPage = 200;

	useEffect(() => {
		const fetchTasks = async () => {
			setIsLoading(true);
			try {
				const loader = DataLoader.getInstance();
				const todos = await loader.fetchData(
					`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${tasksPerPage}`
				);
				dispatch(tasksLoaded([...tasks, ...todos]));
			} catch (error) {
				console.error("Failed to fetch tasks", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchTasks();
		setGUID(GUIDGenerator.generateGUID());
	}, [page]);

	const loadMoreTasks = () => {
		if (!isLoading) {
			setPage(page + 1);
		}
		setGUID(GUIDGenerator.generateGUID());
	};

	const handleToggleCompletion = (id: number) => {
		dispatch(toggleTaskCompletion(id));
		setGUID(GUIDGenerator.generateGUID());
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={tasks}
				keyExtractor={(item) => `${item.id.toString()}${guid}`}
				renderItem={({ item }) => <TaskItem task={item} />}
				onEndReached={loadMoreTasks}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
					isLoading ? <ActivityIndicator size="large" /> : null
				}
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
});

export default MyTasksScreen;
