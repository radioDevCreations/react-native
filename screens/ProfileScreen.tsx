import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
	userLoaded,
	startLoading,
	userLoadFailed,
	pictureLoaded,
} from "../redux/userSlice";
import DataLoader from "../DataLoader";

interface RootState {
	user: {
		userData: UserData | null;
		loading: boolean;
	};
}

interface UserData {
	name: string;
	email: string;
	phone: string;
	address: {
		street: string;
		city: string;
	};
}

const ProfileScreen: React.FC = () => {
	const [userPhoto, setUserPhoto] = useState<string | null>(null);
	const userData = useSelector((state: RootState) => state.user.userData);
	const loading = useSelector((state: RootState) => state.user.loading);
	const dispatch = useDispatch();

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
			} catch (error: any) {
				console.error("Failed to fetch user data:", error);
				dispatch(userLoadFailed(error.message));
			}
		};

		fetchUserData();
	}, [dispatch, userData, userPhoto]);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
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

export default ProfileScreen;
