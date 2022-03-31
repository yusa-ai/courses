import { LogBox } from "react-native";
import Routes from "./src/routes/Routes";
import TimeAgo from "javascript-time-ago";
import { auth } from "./firebase";
import en from "javascript-time-ago/locale/en.json";
import fr from "javascript-time-ago/locale/fr.json";
import { useAuthState } from "react-firebase-hooks/auth";

LogBox.ignoreLogs(["Setting a timer"]); // Ignore annoying warning on Android

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fr);

export default function App() {
	// Dynamically render the app based on the user's authentication state
	const [currentUser] = useAuthState(auth);

	return <Routes user={currentUser} />;
}
