import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "context/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Head>
				<title>House Hunt</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
