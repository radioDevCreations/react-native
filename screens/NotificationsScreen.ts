// src/screens/NotificationsScreen.js
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import DataLoader from "../DataLoader";

interface Notification {
	id: number;
	title: string;
	body: string;
}

const NotificationsScreen: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const loader = DataLoader.getInstance();
				const notificationsData = await loader.fetchData(
					"https://jsonplaceholder.typicode.com/posts"
				);
				setNotifications(notificationsData);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch notifications", error);
				setLoading(false);
			}
		};
		fetchNotifications();
	}, []);

	return (
		<ScrollView style={styles.container}>
			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				notifications.map((notification) => (
					<View key={notification.id} style={styles.notificationContainer}>
						<Text style={styles.notificationTitle}>{notification.title}</Text>
						<Text>{notification.body}</Text>
					</View>
				))
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	notificationContainer: {
		marginBottom: 15,
		padding: 10,
		backgroundColor: "#f0f0f0",
		borderColor: "gray",
		borderWidth: 1,
	},
	notificationTitle: {
		fontWeight: "bold",
	},
});

export default NotificationsScreen;
