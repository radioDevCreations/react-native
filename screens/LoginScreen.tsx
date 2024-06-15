import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { userLoaded } from "../redux/userSlice";
import DataLoader from "../DataLoader";
import { AppDispatch } from "redux/store";
import USER from "utils/USER";

interface RootState {
	user: {
		userData: any;
	};
}

const LoginScreen: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const userData = useSelector((state: RootState) => state.user.userData);
	const dispatch = useDispatch<AppDispatch>();
	const navigation = useNavigation<NavigationProp<any>>();

	const handleLogin = async () => {
		if (username === USER.login && password === USER.password) {
			if (userData === null) {
				const loader = DataLoader.getInstance();
				const tempData = await loader.fetchData(
					`https://jsonplaceholder.typicode.com/users/2`
				);
				dispatch(userLoaded(tempData));
			}
			navigation.navigate("Home");
		} else {
			Alert.alert("Login Failed", "Invalid username or password");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				autoCapitalize="none"
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				autoCapitalize="none"
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button title="Login" onPress={handleLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 52,
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
		textAlign: "center",
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		marginBottom: 24,
		paddingHorizontal: 8,
		borderRadius: 4,
	},
});

export default LoginScreen;
