import Login from "../pages/guest/Login";
import Register from "../pages/guest/Register";
import Splash from "../pages/guest/Splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const GuestStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Splash"
				component={Splash}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
		</Stack.Navigator>
	);
};

export default GuestStack;
