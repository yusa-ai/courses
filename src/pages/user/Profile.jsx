import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => signOut(auth)}>
				<Text>Logout</Text>
			</TouchableOpacity>

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
