import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		createUserWithEmailAndPassword(auth, email, password).then(
			async (userRef) => {
				const user = userRef.user;

				// Mise à jour du pseudo de l'utilisateur en interne
				await updateProfile(user, { displayName: username });

				// Initialisation des données de l'utilisateur en BDD
				await setDoc(doc(db, "users", user.uid), {
					uid: user.uid,
					username: username,
				});
			}
		);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Username"
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={setPassword}
				secureTextEntry={true}
			/>

			<TouchableOpacity onPress={() => handleSubmit()}>
				<Text style={styles.button}>Register</Text>
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

export default Register;
