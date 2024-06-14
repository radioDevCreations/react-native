import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import DataLoader from "../DataLoader";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Post from "entities/Post";

const PostsList: React.FC = () => {
	const navigation = useNavigation<NavigationProp<any>>();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const loader = DataLoader.getInstance();
				const postsData = await loader.fetchData(
					"https://jsonplaceholder.typicode.com/posts"
				);
				setPosts(postsData);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch posts", error);
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	const renderItem = ({ item }: { item: Post }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate("PostDetails", { postId: item.id })}
			style={styles.postContainer}
		>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.body}>{item.body}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<FlatList
					data={posts}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	postContainer: {
		backgroundColor: "#f0f0f0",
		padding: 20,
		marginVertical: 8,
		borderRadius: 5,
		borderColor: "orange",
		borderWidth: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	body: {
		fontSize: 14,
	},
});

export default PostsList;
