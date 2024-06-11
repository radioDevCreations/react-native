import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PostsList from "./PostsList";
import PostDetailsScreen from "./PostDetailsScreen";

const Stack = createStackNavigator();

const PostsScreen: React.FC = () => {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="Posts">
				<Stack.Screen name="Posts" component={PostsList} />
				<Stack.Screen name="PostDetails" component={PostDetailsScreen as any} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default PostsScreen;
