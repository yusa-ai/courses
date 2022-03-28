import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const Splash = ({ navigation }) => (
	<View style={styles.container}>
		<TouchableOpacity
			style={styles.button}
			onPress={() => {
				navigation.push("Login");
			}}>
			<Text>Login</Text>
		</TouchableOpacity>

		<TouchableOpacity
			style={styles.button}
			onPress={() => {
				navigation.push("Register");
			}}>
			<Text>Register</Text>
		</TouchableOpacity>

		<StatusBar style="auto" />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},

	button: {
		marginTop: 10,
		marginBottom: 10,
	},
});

export default Splash;
