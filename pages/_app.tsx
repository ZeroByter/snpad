import Head from "next/head";
import SSRFetcherProvider from "../components/contexts/ssrFetcher";
import "../styles/global.scss";
import PageContainer from "@/components/pretty/shared/pageContainer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Secret Notepad</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SSRFetcherProvider pageProps={pageProps}>
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      </SSRFetcherProvider>
    </>
  );
}

export default MyApp;
