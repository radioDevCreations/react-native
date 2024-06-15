import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import User from "entities/User";

interface ContactTileProps {
	user: User;
}

const ContactTile: React.FC<ContactTileProps> = ({ user }) => {
	const navigation = useNavigation<NavigationProp<any>>();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("ContactDetails", { userId: user.id })}
			style={styles.userContainer}
		>
			<Text style={styles.userName}>{user.name}</Text>
			<Text>{user.email}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
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

export default ContactTile;
