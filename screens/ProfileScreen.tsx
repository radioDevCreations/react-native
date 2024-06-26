import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Image,
	FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
	userLoaded,
	startLoading,
	userLoadFailed,
	pictureLoaded,
} from "../redux/userSlice";
import DataLoader from "../DataLoader";
import User from "entities/User";
import { AppDispatch } from "redux/store";

interface RootState {
	user: {
		userData: User | null;
		loading: boolean;
	};
}

const ProfileScreen: React.FC = () => {
	const [userPhoto, setUserPhoto] = useState<string | null>(null);
	const userData = useSelector((state: RootState) => state.user.userData);
	const loading = useSelector((state: RootState) => state.user.loading);
	const [albums, setAlbums] = useState([]);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				dispatch(startLoading());
				if (userData === null) {
					const loader = DataLoader.getInstance();
					const tempData = await loader.fetchData(
						`https://jsonplaceholder.typicode.com/users/2`
					);
					dispatch(userLoaded(tempData));
				}
				if (userPhoto === null) {
					const loader = DataLoader.getInstance();
					const tempData = await loader.fetchData(`https://randomuser.me/api/`);
					setUserPhoto(tempData.results[0].picture.large);
				}
				dispatch(pictureLoaded());
				return userData;
			} catch (error: any) {
				console.error("Failed to fetch user data:", error);
				dispatch(userLoadFailed(error.message));
			}
		};
		const fetchAlbumsData = async (id: number) => {
			const dataLoader = DataLoader.getInstance();
			try {
				const data = await dataLoader.fetchData(
					`https://jsonplaceholder.typicode.com/albums?userId=${id}`
				);
				setAlbums(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData().then((uData: any): void => {
			fetchAlbumsData(uData?.id);
		});

		fetchUserData();
	}, [dispatch, userData, userPhoto]);

	if (loading) {
		return <ActivityIndicator size="large" color="orange" />;
	}

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: userPhoto || undefined }}
				style={styles.profileImage}
			/>
			<Text style={styles.name}>{userData?.name}</Text>
			<Text style={styles.info}>{userData?.email}</Text>
			<Text style={styles.info}>{userData?.phone}</Text>
			<Text
				style={styles.info}
			>{`${userData?.address?.street}, ${userData?.address?.city}`}</Text>
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

export default ProfileScreen;
