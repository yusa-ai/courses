import { Linking, StyleSheet, Text, View } from "react-native";

import TimeAgo from "./TimeAgo";

// function that gets a full date and returns a string with the format hh:mm
const getTime = (date) => {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	const ampm = hours >= 12 ? "pm" : "am";
	hours %= 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;
	const strTime = hours + ":" + minutes + " " + ampm;
	return strTime;
};

const Course = ({ course }) => (
	<View style={styles.course}>
		<Text style={styles.title}>{course.title}</Text>
		<Text style={styles.instructor}>{course.instructor}</Text>

		<View style={styles.dates}>
			<Text style={styles.date}>
				From {getTime(course.startDate.toDate())} to{" "}
				{getTime(course.endDate.toDate())}
			</Text>

			<Text style={styles.timeago}>
				{" "}
				{"("}
				<TimeAgo date={course.startDate.toDate()} />
				{")"}
			</Text>
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
		minWidth: "85%",
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
		flexDirection: "row",
		flexWrap: "wrap",
	},

	timeago: {
		color: "gray",
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
