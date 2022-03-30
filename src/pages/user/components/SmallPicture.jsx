import { Image, StyleSheet, View } from "react-native";

const SmallPicture = ({ uri }) => (
	<View style={styles.container}>
		<Image
			style={styles.image}
			source={uri ? { uri } : require("../../../assets/profile.png")}
		/>
	</View>
);

const styles = StyleSheet.create({
	container: {
		width: 30,
		height: 30,
		borderRadius: 30,
		overflow: "hidden",
		marginTop: 10,
		marginRight: 10,
	},
	image: {
		width: 30,
		height: 30,
	},
});

export default SmallPicture;
