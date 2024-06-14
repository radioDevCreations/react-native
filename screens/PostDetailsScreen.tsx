import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import DataLoader from "../DataLoader";
import { RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Post from "entities/Post";
import Comment from "entities/Comment";

interface PostDetailsScreenProps {
	route: RouteProp<{ params: { postId: number } }, "params">;
}

const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({ route }) => {
	const { postId } = route.params;
	const [post, setPost] = useState<Post | null>(null);
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);
	const [likes, setLikes] = useState(0);
	const [shares, setShares] = useState(0);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const loader = DataLoader.getInstance();
				const postResponse = await loader.fetchData(
					`https://jsonplaceholder.typicode.com/posts/${postId}`
				);
				const commentsResponse = await loader.fetchData(
					`https://jsonplaceholder.typicode.com/posts/${postId}/comments`
				);
				setPost(postResponse);
				setLikes(Math.floor(Math.random() * 1000));
				setShares(Math.floor(Math.random() * 500));
				setComments(commentsResponse);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch details:", error);
				setLoading(false);
			}
		};
		fetchDetails();
	}, [postId]);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.postContainer}>
				<Text style={styles.title}>{post?.title}</Text>
				<Text style={styles.body}>{post?.body}</Text>
				<View style={styles.iconRow}>
					<Icon name="thumbs-up" size={20} color="#000" />
					<Text style={styles.iconText}>{likes}</Text>
				</View>
				<View style={styles.iconRow}>
					<Icon name="share" size={20} color="#000" />
					<Text style={styles.iconText}>{shares}</Text>
				</View>
			</View>
			<Text style={styles.commentsTitle}>Comments</Text>
			{comments.map((comment) => (
				<View key={comment.id} style={styles.commentContainer}>
					<Text style={styles.commentName}>{comment.name}</Text>
					<Text style={styles.commentEmail}>{comment.email}</Text>
					<Text style={styles.commentBody}>{comment.body}</Text>
				</View>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	postContainer: {
		backgroundColor: "#f8f9fa",
		padding: 20,
		marginVertical: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	body: {
		fontSize: 16,
	},
	commentsTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 20,
	},
	commentContainer: {
		backgroundColor: "#e9ecef",
		padding: 15,
		marginVertical: 8,
		marginHorizontal: 20,
		borderRadius: 5,
		borderColor: "orange",
		borderWidth: 1,
	},
	commentName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	commentEmail: {
		fontSize: 14,
		color: "gray",
	},
	commentBody: {
		fontSize: 14,
	},
	iconRow: {
		flexWrap: "nowrap",
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	iconText: {
		fontSize: 16,
		marginLeft: 5,
	},
});

export default PostDetailsScreen;
