import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Comment from "entities/Comment";

interface CommentsBoardProps {
	comments: Comment[];
}

const CommentsBoard: React.FC<CommentsBoardProps> = ({ comments }) => {
	return (
		<>
			<Text style={styles.commentsTitle}>Comments</Text>
			{comments.map((comment) => (
				<View key={comment.id} style={styles.commentContainer}>
					<Text style={styles.commentName}>{comment.name}</Text>
					<Text style={styles.commentEmail}>{comment.email}</Text>
					<Text style={styles.commentBody}>{comment.body}</Text>
				</View>
			))}
		</>
	);
};

const styles = StyleSheet.create({
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
});

export default CommentsBoard;
