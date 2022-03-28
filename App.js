import Routes from "./src/routes/Routes";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App() {
	const [currentUser] = useAuthState(auth);

	return <Routes user={currentUser} />;
}
