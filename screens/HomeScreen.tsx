import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Platform,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchPosts } from "redux/postsSlice";

interface HomeScreenProps {
	navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { postsNumber } = useSelector((state: RootState) => state.posts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Welcome to MyApp!</Text>
			<Text style={styles.subtitle}>Your one-stop app for everything!</Text>

			<View style={styles.buttonContainer}>
				<Button
					title="View Network"
					onPress={() => navigation.navigate("Contacts")}
				/>
				<Button
					title="View Profile"
					onPress={() => navigation.navigate("Profile")}
				/>
			</View>

			<View style={styles.cardContainer}>
				<TouchableOpacity
					style={styles.featureCard}
					onPress={() => navigation.navigate("Posts")}
				>
					<Text style={styles.cardTitle}>Recent Posts</Text>
					<Text style={styles.cardDetail}>View recent notifications</Text>
					{postsNumber > 0 && (
						<View style={styles.notificationBadge}>
							<Text style={styles.notificationText}>{postsNumber}</Text>
						</View>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.featureCard}
					onPress={() => navigation.navigate("Profile")}
				>
					<Text style={styles.cardTitle}>My Profile</Text>
					<Text style={styles.cardDetail}>View and edit your profile</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.featureCard}
					onPress={() => navigation.navigate("Contacts")}
				>
					<Text style={styles.cardTitle}>Contacts</Text>
					<Text style={styles.cardDetail}>Meet your network!</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.featureCard}
					onPress={() => navigation.navigate("Tasks")}
				>
					<Text style={styles.cardTitle}>Tasks</Text>
					<Text style={styles.cardDetail}>Check your task list</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.featureCard}
					onPress={() => navigation.navigate("Settings")}
				>
					<Text style={styles.cardTitle}>Settings</Text>
					<Text style={styles.cardDetail}>Adjust app settings</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#f5f5f5",
		...Platform.select({
			default: {
				paddingTop: 90,
			},
			ios: {
				paddingTop: 90,
			},
			android: {
				paddingTop: 80,
			},
		}),
	},
	cardContainer: {
		flex: 1,
		width: "100%",
		...Platform.select({
			default: {
				paddingTop: 10,
			},
			ios: {
				paddingTop: 10,
			},
			android: {
				paddingTop: 20,
			},
		}),
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 18,
		color: "#666",
		marginBottom: 20,
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	featureCard: {
		backgroundColor: "#ffffff",
		padding: 20,
		marginHorizontal: 10,
		marginTop: 15,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	cardDetail: {
		fontSize: 14,
		color: "#666",
		marginTop: 5,
	},
	notificationBadge: {
		position: "absolute",
		right: 10,
		top: 10,
		backgroundColor: "red",
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	notificationText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default HomeScreen;
