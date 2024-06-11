import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ContactsList from "./ContactsList";
import ContactDetailsScreen from "./ContactDetailsScreen";

const Stack = createStackNavigator();

const ContactsScreen: React.FC = () => {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="Contacts">
				<Stack.Screen name="Contacts" component={ContactsList} />
				<Stack.Screen
					name="ContactDetails"
					component={ContactDetailsScreen as any}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default ContactsScreen;
