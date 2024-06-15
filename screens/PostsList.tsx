import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Post from "entities/Post";
import SearchBar from "components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchPosts } from "redux/postsSlice";

const PostsList: React.FC = () => {
	const navigation = useNavigation<NavigationProp<any>>();
	const dispatch = useDispatch<AppDispatch>();
	const { posts, loading, error } = useSelector(
		(state: RootState) => state.posts
	);
	const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	useEffect(() => {
		setFilteredPosts(posts);
	}, [posts]);

	const handleSearch = (query: string) => {
		setSearch(query);
		if (query === "") {
			setFilteredPosts(posts);
		} else {
			const filtered = posts.filter((post) =>
				post.title.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredPosts(filtered);
		}
	};

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
			<SearchBar search={search} onSearch={handleSearch} />
			{loading ? (
				<ActivityIndicator size="large" color="orange" />
			) : (
				<FlatList
					data={filteredPosts}
					renderItem={renderItem}
					keyExtractor={(item) => `${item.id}`}
				/>
			)}
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	searchBar: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 8,
		margin: 16,
		borderRadius: 8,
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
	errorText: {
		color: "red",
		textAlign: "center",
		marginTop: 20,
	},
});

export default PostsList;
