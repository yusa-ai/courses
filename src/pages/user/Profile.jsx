import { StyleSheet, Text, View } from "react-native";

const Profile = () => {
	return (
		<View style={styles.container}>
			<Text>Feed</Text>
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

export default Profile;
