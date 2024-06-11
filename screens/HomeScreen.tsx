import React from "react";
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

interface HomeScreenProps {
	navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Welcome to MyApp!</Text>
			<Text style={styles.subtitle}>Your one-stop app for everything!</Text>

			<View style={styles.buttonContainer}>
				<Button
					title="Go to Settings"
					onPress={() => navigation.navigate("Settings")}
				/>
				<Button
					title="View Profile"
					onPress={() => navigation.navigate("Profile")}
				/>
			</View>

			<View style={styles.cardContainer}>
				<TouchableOpacity
					style={styles.featureCard}
					onPress={() => navigation.navigate("Profile")}
				>
					<Text style={styles.cardTitle}>My Profile</Text>
					<Text style={styles.cardDetail}>View and edit your profile</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.featureCard}
					onPress={() => navigation.navigate("Settings")}
				>
					<Text style={styles.cardTitle}>Settings</Text>
					<Text style={styles.cardDetail}>Adjust app settings</Text>
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
					onPress={() => navigation.navigate("Notifications")}
				>
					<Text style={styles.cardTitle}>Notifications</Text>
					<Text style={styles.cardDetail}>View recent notifications</Text>
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
});

export default HomeScreen;
