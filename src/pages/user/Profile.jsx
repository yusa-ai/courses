import * as ImagePicker from "expo-image-picker";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db, storage } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { signOut, updateProfile } from "firebase/auth";

import Dialog from "react-native-dialog";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const Profile = () => {
	const student = auth.currentUser;

	const [studentData] = useDocumentData(doc(db, "students", student.uid));

	const [modalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState(student.displayName);

	const [picture, setPicture] = useState(studentData?.picture);

	const changeName = async (name) => {
		// Update the internal display name of the user
		await updateProfile(auth.currentUser, {
			displayName: name,
		});

		// Update the username in database
		await updateDoc(doc(db, "students", student.uid), {
			name,
		});

		setName(name);
	};

	const changePicture = async () => {
		// Open image gallery on both Android and iOS
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "Images",
			allowsEditing: true,
		});

		if (result.cancelled) return;

		const newImageRef = ref(storage, `images/profile/${student.uid}.png`);

		// Convert the image to a blob
		const r = await fetch(result.uri);
		const blob = await r.blob();

		await uploadBytesResumable(newImageRef, blob);

		const picture = await getDownloadURL(newImageRef);
		await updateDoc(doc(db, "students", student.uid), {
			picture,
		});

		setPicture(picture);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onLongPress={() => changePicture()}>
				<View style={styles.profileImage}>
					{!picture && (
						<Image
							source={
								studentData && studentData.picture
									? { uri: studentData.picture }
									: require("../../assets/profile.png")
							}
							style={styles.image}
							resizeMode="cover"
						/>
					)}
					{picture && (
						<Image
							source={{ uri: picture }}
							style={styles.image}
							resizeMode="cover"
						/>
					)}
				</View>
			</TouchableOpacity>

			<View>
				<Text style={styles.name}>{student.displayName}</Text>
				{studentData && <Text style={styles.group}>{studentData.group}</Text>}
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
				<Dialog.Title>Change name</Dialog.Title>
				<Dialog.Input placeholder="New name" onChangeText={setName} />
				<Dialog.Button label="Cancel" onPress={() => setModalVisible(false)} />
				<Dialog.Button
					label="Confirm"
					onPress={async () => {
						await changeName(name);
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
		backgroundColor: "#4285f4",
	},

	name: {
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
