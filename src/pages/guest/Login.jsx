import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	return (
		<View style={styles.container}>
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

			<TouchableOpacity onPress={() => handleSubmit()}>
				<Text style={styles.button}>Login</Text>
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

	input: {
		height: 50,
	},

	button: {
		marginTop: 10,
	},
});

export default Login;
