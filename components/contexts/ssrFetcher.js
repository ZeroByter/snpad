import { useState, createContext, useContext } from "react"
import { useEffect } from "react"

export const SSRFetcherContext = createContext()

export default function SSRFetcherProvider({ children, pageProps }) {
    const [pagePropsState, setPagePropsState] = useState(pageProps || {})

    useEffect(() => {
        setPagePropsState(pageProps)
    }, [pageProps])

    return (
        <SSRFetcherContext.Provider value={{ props: pagePropsState, setProps: setPagePropsState }}>
            {children}
        </SSRFetcherContext.Provider>
    )
}

export const useSSRFetcher = () => {
    return useContext(SSRFetcherContext)
}