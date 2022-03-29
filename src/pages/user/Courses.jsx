import { FlatList, StyleSheet, View } from "react-native";
import { collection, orderBy, query, where } from "firebase/firestore";

import Course from "./components/Course";
import { StatusBar } from "expo-status-bar";
import { db } from "../../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Courses = () => {
	const today = getTodayDate();

	// Get future courses and listen for changes in real time (auto-update)
	const [courses, loading, error] = useCollectionData(
		query(
			collection(db, "courses"),
			where("startDate", ">=", today),
			orderBy("startDate", "asc")
		)
	);

	const renderCourse = ({ item }) => <Course course={item} />;

	return (
		<View style={styles.container}>
			{courses && (
				<FlatList
					style={styles.courses}
					data={courses}
					renderItem={renderCourse}
					keyExtractor={(_item, index) => index}
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
		backgroundColor: "#ed3b3b",
	},

	courses: {
		marginTop: 20,
	},
});

const getTodayDate = () => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, "0");
	const mm = String(today.getMonth()).padStart(2, "0");
	const yyyy = today.getFullYear();

	return new Date(yyyy, mm, dd);
};

export default Courses;
