import { loadIdToken } from "auth/firebaseAdmin";
import FirebaseAuth from "components/FirebaseAuth";
import Layout from "components/layout";
import { GetServerSideProps, NextApiRequest } from "next";

const Login = () => {
	return <Layout main={<FirebaseAuth />} />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const uid = await loadIdToken(req as NextApiRequest);

	if (uid) {
		res.setHeader("location", "/"); //location header is used to redirect the user to a different page
		res.statusCode = 302; //redirect status code
		res.end(); //end the response
	}

	return { props: {} };
};

export default Login;
