import React, { useEffect, useState } from "react";
import {
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	ListRenderItem,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Post from "../entities/Post";
import DataLoader from "../DataLoader";

interface AllPostsScreenProps {
	navigation: NavigationProp<any>;
}

const AllPostsScreen: React.FC<AllPostsScreenProps> = ({ navigation }) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const loader = DataLoader.getInstance();
				const postsData = await loader.fetchData(
					"https://jsonplaceholder.org/posts"
				);
				setPosts(postsData);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch posts", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const renderItem: ListRenderItem<Post> = ({ item }) => (
		<TouchableOpacity
			style={styles.item}
			onPress={() => navigation.navigate("PostDetail", { post: item })}
		>
			<Text style={styles.title}>{item.title}</Text>
		</TouchableOpacity>
	);

	return (
		<FlatList
			data={posts}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
		/>
	);
};

const styles = StyleSheet.create({
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

export default AllPostsScreen;
