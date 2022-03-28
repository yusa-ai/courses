import { Linking, StyleSheet, Text, View } from "react-native";

const Course = ({ course }) => (
	<View style={styles.course}>
		<Text style={styles.title}>{course.title}</Text>
		<Text style={styles.instructor}>{course.instructor}</Text>

		<View style={styles.dates}>
			<Text style={styles.date}>{course.startDate.toDate().toString()}</Text>
			<Text style={styles.date}>{course.endDate.toDate().toString()}</Text>
		</View>

		<Text style={styles.platform}>{course.platform}</Text>
		{course.link && (
			<Text style={styles.link} onPress={() => Linking.openURL(course.link)}>
				{course.link}
			</Text>
		)}
	</View>
);

const styles = StyleSheet.create({
	course: {
		backgroundColor: "white",
		marginBottom: 10,
		borderRadius: 7,
		padding: 20,
	},

	title: {
		fontSize: 16,
		fontWeight: "600",
	},

	instructor: {
		marginTop: 10,
	},

	dates: {
		marginTop: 10,
	},

	platform: {
		marginTop: 10,
	},

	link: {
		color: "blue",
		textDecorationLine: "underline",
	},
});

export default Course;
