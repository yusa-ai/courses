import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const Profile = () => {
	return (
		<View style={styles.container}>
			<Text>Profile</Text>

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

export default Profile;
