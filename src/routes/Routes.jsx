import GuestStack from "./GuestStack";
import { NavigationContainer } from "@react-navigation/native";
import UserTab from "./UserTab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Routes = ({ user }) => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				{!user && <Stack.Screen name="GuestStack" component={GuestStack} />}
				{user && <Stack.Screen name="UserTab" component={UserTab} />}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
