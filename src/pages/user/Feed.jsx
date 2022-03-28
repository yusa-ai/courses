import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const Feed = () => {
	return (
		<View style={styles.container}>
			<Text>Feed</Text>

			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},
});

export default Feed;
