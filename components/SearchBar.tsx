import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

interface SearchBarProps {
	search: string;
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearch }) => {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.searchBar}
				placeholder="Search posts..."
				value={search}
				onChangeText={onSearch}
				autoCapitalize="none"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	searchBar: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 8,
		borderRadius: 8,
	},
});

export default SearchBar;
