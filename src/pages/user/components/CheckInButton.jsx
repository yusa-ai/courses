import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CheckInButton = ({ text, disabled, onPress }) => {
	return (
		<TouchableOpacity
			style={styles.button}
			disabled={disabled}
			onPress={onPress}>
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		alignSelf: "flex-start",
		marginTop: 10,
		padding: 10,
		borderRadius: 7,
		backgroundColor: "#ed3b3b",
	},

	text: {
		color: "white",
	},
});

export default CheckInButton;
