// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ContactsScreen from "./screens/ContactsScreen";
import PostsScreen from "./screens/PostsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MyTasksScreen from "./screens/MyTasksScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./redux/store";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Tasks" component={MyTasksScreen} />
		</Stack.Navigator>
	);
}

function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: string = "";

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Contacts") {
						iconName = focused ? "people" : "people-outline";
					} else if (route.name === "Posts") {
						iconName = focused ? "add-circle" : "add-circle-outline";
					} else if (route.name === "Profile") {
						iconName = focused ? "person" : "person-outline";
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
					} else if (route.name === "Tasks") {
						iconName = focused
							? "checkmark-done-circle"
							: "checkmark-done-circle-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "orange",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Contacts"
				component={ContactsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Posts"
				component={PostsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen name="Profile" component={ProfileScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
			<Tab.Screen name="Tasks" component={MyTasksScreen} />
		</Tab.Navigator>
	);
}

const AppNavigator: React.FC = () => {
	const userData = useSelector((state: RootState) => state.user.userData);

	return (
		<NavigationContainer>
			{userData != null ? <TabNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
};

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
};

export default App;
