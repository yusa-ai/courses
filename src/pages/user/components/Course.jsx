import {
	FlatList,
	Linking,
	Platform,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";

import CheckInButton from "./CheckInButton";
import SmallPicture from "./SmallPicture";
import TimeAgo from "./TimeAgo";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { db } from "../../../../firebase";

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

const platform = Platform.OS;

// function that display groups with a comma between them
const getGroups = (groups) => {
	let groupsString = "";
	for (let i = 0; i < groups.length; i++) {
		groupsString += groups[i];
		if (i !== groups.length - 1) {
			groupsString += ", ";
		}
	}
	return groupsString;
};

const Course = ({ course, studentData, studentsData }) => {
	const checkedIn = course.checkedIn.includes(studentData.uid);

	const handleSubmit = async () => {
		await updateDoc(doc(db, "courses", course.id), {
			checkedIn: [...course.checkedIn, studentData.uid],
		});
	};

	const renderPicture = ({ item }) => {
		const student = studentsData?.find((student) => student.uid === item);

		return <SmallPicture uri={student?.picture} />;
	};

	return (
		<View style={styles.course}>
			<View style={styles.inline}>
				<Text
					style={platform === "ios" ? styles.titleIOS : styles.titleAndroid}>
					{course.title}
				</Text>
				<Text style={styles.groups}>{getGroups(course.groups)}</Text>
			</View>

			<Text style={styles.instructor}>{course.instructor}</Text>

			<View style={styles.dates}>
				<Text>
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

			<CheckInButton
				text={checkedIn ? "Checked in ✅" : "Check in ⏰"}
				disabled={checkedIn}
				onPress={handleSubmit}
			/>

			<FlatList
				data={course.checkedIn}
				renderItem={renderPicture}
				keyExtractor={(_item, index) => index}
				scrollEnabled={false}
				numColumns={8}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	course: {
		backgroundColor: "white",
		marginBottom: 10,
		borderRadius: 7,
		padding: 20,
		minWidth: "85%",
	},

	titleIOS: {
		fontSize: 16,
		fontWeight: "600",
	},

	titleAndroid: {
		fontSize: 16,
		fontWeight: "bold",
	},

	groups: {
		color: "dimgray",
	},

	inline: {
		flexDirection: "row",
		justifyContent: "space-between",
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
		color: "#ed3b3b",
		textDecorationLine: "underline",
	},
});

export default Course;
