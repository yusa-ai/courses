import { FlatList, StyleSheet, Text, View } from "react-native";
import {
	Timestamp,
	collection,
	orderBy,
	query,
	where,
} from "firebase/firestore";

import { StatusBar } from "expo-status-bar";
import { db } from "../../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Feed = () => {
	const [courses, loading, error] = useCollectionData(
		query(collection(db, "courses"))
	);

	const renderCourse = ({ item }) => (
		<View style={styles.course}>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.instructor}>{item.instructor}</Text>

			<Text style={styles.date}>{item.startDate.toDate().toString()}</Text>
			<Text style={styles.date}>{item.endDate.toDate().toString()}</Text>

			<Text style={styles.platform}>{item.platform}</Text>
			<Text style={styles.link}>{item.link}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			{courses && (
				<FlatList
					data={courses}
					renderItem={renderCourse}
					keyExtractor={(item, index) => index}
				/>
			)}

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

export default Feed;
