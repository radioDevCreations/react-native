import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Image,
	FlatList,
} from "react-native";
import DataLoader from "../DataLoader";
import { RouteProp } from "@react-navigation/native";
import User from "entities/User";

interface ContactDetailsScreenProps {
	route: RouteProp<{ params: { userId: number } }, "params">;
}

const ContactDetailsScreen: React.FC<ContactDetailsScreenProps> = ({
	route,
}) => {
	const { userId } = route.params;
	const [contact, setUser] = useState<User | null>(null);
	const [userPhoto, setUserPhoto] = useState<string | null>(null);
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchContactDetails = async () => {
			try {
				if (contact === null) {
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
				return contact;
			} catch (error) {
				console.error("Failed to fetch details:", error);
				setLoading(false);
			}
		};

		const fetchAlbumsData = async (id: number) => {
			const dataLoader = DataLoader.getInstance();
			try {
				const data = await dataLoader.fetchData(
					`https://jsonplaceholder.typicode.com/albums?userId=${userId}`
				);
				setAlbums(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchContactDetails().then((uData: any): void => {
			fetchAlbumsData(uData?.id);
		});
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
			<Text style={styles.name}>{contact?.name}</Text>
			<Text style={styles.info}>{contact?.email}</Text>
			<Text style={styles.info}>{contact?.phone}</Text>
			<Text
				style={styles.info}
			>{`${contact?.address?.street}, ${contact?.address?.city}`}</Text>
			<View style={styles.container}>
				<Text style={styles.albumsTitle}>Activities</Text>
				<FlatList
					data={albums}
					keyExtractor={(item: any) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={styles.itemContainer}>
							<Text style={styles.itemText}>{item.title}</Text>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 80,
		backgroundColor: "#f5f5f5",
	},
	activityContainer: {
		flex: 1,
		alignItems: "center",
		paddingTop: 50,
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
	albumsTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		paddingLeft: 10,
		alignSelf: "flex-start",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "red",
	},
	itemContainer: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "orange",
	},
	itemText: {
		fontSize: 16,
	},
});

export default ContactDetailsScreen;
