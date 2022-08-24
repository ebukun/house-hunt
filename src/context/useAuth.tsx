import initFirebase from "auth/firebase.config";
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { removeToken, setToken } from "auth/tokenCookies";
import { useRouter } from "next/router";

initFirebase();

interface AuthContext {
	user: firebase.User | null;
	logout: () => void;
	authenticated: boolean;
}

type Props = {
	children: React.ReactNode;
};

const AuthContext = createContext<AuthContext>({
	user: null,
	logout: () => null,
	authenticated: false,
});

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<firebase.User | null>(null);
	const router = useRouter();
	const authenticated = !!user;

	const logout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				router.push("/");
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		const cancelAuthListener = firebase.auth().onIdTokenChanged(async user => {
			if (user) {
				const token = await user.getIdToken();
				setToken(token);
				setUser(user);
			} else {
				removeToken();
				setUser(null);
			}
		});
		return () => {
			cancelAuthListener();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, authenticated, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
