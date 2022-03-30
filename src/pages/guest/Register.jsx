import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";

const Register = ({ navigation }) => {
	const [name, setName] = useState("");
	const [group, setGroup] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		createUserWithEmailAndPassword(auth, email, password).then(async (ref) => {
			const student = ref.user;

			// Update the internal display name of the student
			await updateProfile(student, { displayName: name });

			// Set user data in database
			await setDoc(doc(db, "students", student.uid), {
				uid: student.uid,
				name: name,
				group,
			});
		});
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={styles.container}>
				<Text style={styles.title}>Register</Text>

				<View style={styles.dualInput}>
					<TextInput
						style={[styles.name, { flexGrow: 1 }]}
						placeholder="Name"
						onChangeText={setName}
					/>

					<TextInput
						style={styles.group}
						placeholder="Group"
						onChangeText={setGroup}
						keyboardType={"numeric"}
					/>
				</View>

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

				<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>

				<Text
					style={styles.navigation}
					onPress={() => navigation.navigate("Login")}>
					Already have an account?
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
		backgroundColor: "#ed3b3b",
	},

	title: {
		fontSize: 50,
		fontWeight: "300",
		color: "white",
		marginBottom: 50,
	},

	dualInput: {
		alignSelf: "stretch",
		flexDirection: "row",
		justifyContent: "center",
	},

	name: {
		alignSelf: "stretch",
		height: 50,
		marginLeft: 20,
		marginRight: 5,
		marginVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 7,
		backgroundColor: "white",
	},

	group: {
		alignSelf: "stretch",
		height: 50,
		marginLeft: 5,
		marginRight: 20,
		marginVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 7,
		backgroundColor: "white",
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
		color: "red",
		fontSize: 20,
	},

	navigation: {
		color: "white",
		marginTop: 20,
		textDecorationLine: "underline",
	},
});

export default Register;
