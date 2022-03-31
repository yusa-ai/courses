import { FlatList, StyleSheet, View } from "react-native";
import { auth, db } from "../../../firebase";
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";

import Course from "./components/Course";
import { StatusBar } from "expo-status-bar";

const Courses = () => {
	const today = getTodayDate();

	const [studentData] = useDocumentData(
		doc(db, "students", auth.currentUser.uid)
	);

	const [studentsData] = useCollectionData(collection(db, "students"));

	// Get future courses and listen for changes in real time (auto-update)
	const [courses] = useCollectionData(
		query(
			collection(db, "courses"),
			where("startDate", ">=", today),
			orderBy("startDate", "asc")
		)
	);

	const renderCourse = ({ item }) => (
		<Course
			course={item}
			studentData={studentData}
			studentsData={studentsData}
		/>
	);

	return (
		<View style={styles.container}>
			{courses && studentData && studentsData && (
				<FlatList
					style={styles.courses}
					// Filtering courses by group
					data={[...courses].filter((course) =>
						course.groups.includes(studentData.group)
					)}
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
		backgroundColor: "#4285f4",
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
