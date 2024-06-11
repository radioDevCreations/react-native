import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import DataLoader from "../DataLoader";
import { RouteProp } from "@react-navigation/native";

interface ContactDetailsScreenProps {
	route: RouteProp<{ params: { userId: number } }, "params">;
}

interface User {
	name: string;
	email: string;
	phone: string;
	address: {
		street: string;
		city: string;
	};
}

const ContactDetailsScreen: React.FC<ContactDetailsScreenProps> = ({
	route,
}) => {
	const { userId } = route.params;
	const [user, setUser] = useState<User | null>(null);
	const [userPhoto, setUserPhoto] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				if (user === null) {
					const loader = DataLoader.getInstance();
					const userResponse = await loader.fetchData(
						`https://jsonplaceholder.typicode.com/users/${userId}`
					);
					setUser(userResponse);
				}
				if (userPhoto === null) {
					const loader = DataLoader.getInstance();
					const tempData = await loader.fetchData(`https://randomuser.me/api/`);
					setUserPhoto(tempData.results[0].picture.large);
				}
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch details:", error);
				setLoading(false);
			}
		};
		fetchDetails();
	}, [userId]);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: userPhoto || undefined }}
				style={styles.profileImage}
			/>
			<Text style={styles.name}>{user?.name}</Text>
			<Text style={styles.info}>{user?.email}</Text>
			<Text style={styles.info}>{user?.phone}</Text>
			<Text
				style={styles.info}
			>{`${user?.address?.street}, ${user?.address?.city}`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f5f5f5",
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	info: {
		fontSize: 18,
		color: "#666",
		marginBottom: 5,
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginBottom: 20,
	},
});

export default ContactDetailsScreen;
