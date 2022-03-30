import { Image, StyleSheet, View } from "react-native";

const SmallPicture = ({ uri }) => (
	<View style={styles.container}>
		<Image
			style={styles.image}
			source={{
				uri: uri,
			}}
		/>
	</View>
);

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		borderRadius: 25,
		overflow: "hidden",
		marginRight: 10,
	},
	image: {
		width: 50,
		height: 50,
	},
});

export default SmallPicture;
