import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { auth, db } from "../../../firebase";
import { collection, doc, orderBy, query, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const Register = () => {
	const [username, setUsername] = useState("");
	const [group, setGroup] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [groups] = useCollectionData(
		query(collection(db, "groups"), orderBy("name", "asc"))
	);

	const handleSubmit = async () => {
		createUserWithEmailAndPassword(auth, email, password).then(
			async (userRef) => {
				const user = userRef.user;

				// Update the internal display name of the user
				await updateProfile(user, { displayName: username });

				// Set user data in database
				await setDoc(doc(db, "users", user.uid), {
					uid: user.uid,
					username: username,
					group: group,
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

			{groups && (
				<Picker
					style={styles.picker}
					mode="dropdown"
					selectedValue={group}
					onValueChange={setGroup}>
					<Picker.Item label="Select a group" value="" />
					{groups.map((group) => (
						<Picker.Item label={group.name} value={group.id} key={group.id} />
					))}
				</Picker>
			)}

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

	picker: {
		alignSelf: "stretch",
	},

	input: {
		height: 50,
	},

	button: {
		marginTop: 10,
	},
});

export default Register;
