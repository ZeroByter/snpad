import Head from "next/head"
import SSRFetcherProvider from "../components/contexts/ssrFetcher"

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Secret Notepad</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<SSRFetcherProvider pageProps={pageProps}>
				<Component {...pageProps} />
			</SSRFetcherProvider>
		</>
	)
}

export default MyApp
