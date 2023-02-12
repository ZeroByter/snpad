import Head from "next/head"
import SSRFetcherProvider from "../components/contexts/ssrFetcher"
import PrettyStyles from "../components/pretty/styles"
import "../styles/global.scss"

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Secret Notepad</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<SSRFetcherProvider pageProps={pageProps}>
				<PrettyStyles>
					<Component {...pageProps} />
				</PrettyStyles>
			</SSRFetcherProvider>
		</>
	)
}

export default MyApp
