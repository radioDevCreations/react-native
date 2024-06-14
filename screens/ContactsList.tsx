import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import DataLoader from "../DataLoader";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import User from "entities/User";

const ContactsList: React.FC = () => {
	const navigation = useNavigation<NavigationProp<any>>();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const loader = DataLoader.getInstance();
				const userData = await loader.fetchData(
					"https://jsonplaceholder.typicode.com/users"
				);
				setUsers(userData);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch users", error);
				setLoading(false);
			}
		};
		fetchUsers();
	}, []);

	return (
		<ScrollView style={styles.container}>
			{loading ? (
				<Text>Loading users...</Text>
			) : (
				users.map((user) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("ContactDetails", { userId: user.id })
						}
						style={styles.userContainer}
						key={user.id}
					>
						<Text style={styles.userName}>{user.name}</Text>
						<Text>{user.email}</Text>
					</TouchableOpacity>
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
	userContainer: {
		marginBottom: 15,
		padding: 10,
		backgroundColor: "#f0f0f0",
		borderColor: "orange",
		borderWidth: 1,
	},
	userName: {
		fontWeight: "bold",
	},
});

export default ContactsList;
