import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { signOut, updateProfile } from "firebase/auth";

import Dialog from "react-native-dialog";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const Profile = () => {
	const user = auth.currentUser;

	const [modalVisible, setModalVisible] = useState(false);
	const [username, setUsername] = useState(user.displayName);

	const [userData] = useDocumentData(doc(db, "users", user.uid));

	const changeUsername = async (username) => {
		// Update the internal display name of the user
		await updateProfile(auth.currentUser, {
			displayName: username,
		});

		// Update the username in database
		await updateDoc(doc(db, "users", auth.currentUser.uid), {
			username,
		});

		setUsername(username);
	};

	return (
		<View style={styles.container}>
			<View style={styles.profileImage}>
				<Image
					source={require("../../assets/profile.png")}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>

			<View>
				<Text style={styles.username}>{user.displayName}</Text>
				{userData && <Text style={styles.group}>Group: {userData.group}</Text>}
			</View>

			<View style={styles.menu}>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<View style={[styles.menuAction, styles.menuActionBorder]}>
						<Ionicons name="pencil-outline" style={styles.menuIcon} size={15} />
						<Text style={styles.menuText}>Change name</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={async () => await signOut(auth)}>
					<View style={styles.menuAction}>
						<Ionicons
							name="log-out-outline"
							style={styles.menuIcon}
							size={15}
						/>
						<Text style={styles.menuText}>Log out</Text>
					</View>
				</TouchableOpacity>
			</View>

			<Dialog.Container
				visible={modalVisible}
				onBackdropPress={() => {
					setModalVisible(false);
				}}>
				<Dialog.Title>Change username</Dialog.Title>
				<Dialog.Input placeholder="New username" onChangeText={setUsername} />
				<Dialog.Button label="Cancel" onPress={() => setModalVisible(false)} />
				<Dialog.Button
					label="Confirm"
					onPress={async () => {
						await changeUsername(username);
						setModalVisible(!modalVisible);
					}}
				/>
			</Dialog.Container>

			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ed3b3b",
	},

	username: {
		marginTop: 10,
		color: "white",
		fontSize: 36,
		fontWeight: "300",
	},

	group: {
		color: "white",
		fontSize: 24,
		fontWeight: "300",
	},

	image: {
		flex: 1,
		height: undefined,
		width: undefined,
	},

	profileImage: {
		width: 250,
		height: 250,
		borderRadius: 250,
		overflow: "hidden",
	},

	menu: {
		marginTop: 35,
		alignSelf: "stretch",
		marginLeft: 30,
		marginRight: 30,
		paddingTop: 5,
		paddingBottom: 5,
		borderWidth: 1,
		borderRadius: 7,
		borderColor: "#E8E8E8",
		backgroundColor: "white",
	},

	menuAction: {
		flexDirection: "row",
		alignSelf: "stretch",
		alignItems: "center",
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 15,
		paddingBottom: 15,
	},

	menuActionBorder: {
		borderBottomWidth: 1,
		borderBottomColor: "#E8E8E8",
	},

	menuIcon: {
		marginLeft: 15,
		marginRight: 15,
	},

	menuText: {
		fontSize: 16,
		fontWeight: "500",
	},
});

export default Profile;
