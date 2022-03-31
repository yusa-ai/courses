import Courses from "../pages/user/Courses";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "../pages/user/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const UserTab = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				tabBarActiveTintColor: "#4285f4",
			}}>
			<Tab.Screen
				name="Courses"
				component={Courses}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="list-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-circle-outline" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default UserTab;
