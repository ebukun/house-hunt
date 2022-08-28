import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "components/StyledFirebaseAuth";

const uiConfig = {
	signInFlow: "popup",
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: false,
		},
	],
	signInSuccessUrl: "/",
};

const FirebaseAuth = () => {
	const [renderAuth, setRenderAuth] = useState(false);

	useEffect(() => {
		setRenderAuth(true);
	}, []);

	return (
		<div className="mt-16">
			{renderAuth ? (
				<StyledFirebaseAuth
					uiConfig={uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			) : null}
		</div>
	);
};

export default FirebaseAuth;
