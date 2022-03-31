import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={styles.container}>
				<Text style={styles.title}>Login</Text>
				<TextInput
					style={styles.input}
					placeholder="Email address"
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					onChangeText={setPassword}
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				<Text
					style={styles.navigation}
					onPress={() => navigation.navigate("Register")}>
					Don't have an account yet?
				</Text>

				<StatusBar style="light" />
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#4285f4",
	},

	title: {
		fontSize: 50,
		fontWeight: "300",
		color: "white",
		marginBottom: 50,
	},

	input: {
		alignSelf: "stretch",
		height: 50,
		marginHorizontal: 20,
		marginVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 7,
		backgroundColor: "white",
	},

	button: {
		marginTop: 10,
		padding: 10,
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 7,
	},

	buttonText: {
		color: "#4285f4",
		fontSize: 20,
	},

	navigation: {
		color: "white",
		marginTop: 20,
		textDecorationLine: "underline",
	},
});

export default Login;
