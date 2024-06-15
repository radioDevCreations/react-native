import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import DataLoader from "../DataLoader";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import User from "entities/User";
import ContactTile from "components/ContactTile";

const ContactsList: React.FC = () => {
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
				users.map((user) => <ContactTile key={user.id} user={user} />)
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});

export default ContactsList;
