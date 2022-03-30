import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const Splash = ({ navigation }) => (
	<View style={styles.container}>
		<Text style={styles.title}>Courses.</Text>

		<View style={styles.buttons}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.push("Login");
				}}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.push("Register");
				}}>
				<Text style={styles.buttonText}>Register</Text>
			</TouchableOpacity>
		</View>

		<StatusBar style="light" />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ed3b3b",
	},

	title: {
		fontSize: 50,
		fontWeight: "300",
		color: "white",
	},

	buttons: {
		marginTop: 50,
	},

	button: {
		margin: 10,
		padding: 10,
		alignSelf: "stretch",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 7,
	},

	buttonText: {
		color: "red",
		fontSize: 20,
	},
});

export default Splash;
