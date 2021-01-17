import Head from "next/head"
import "../styles/index.css"
import { ThemeProvider } from "styled-components"
import { useApollo } from "../lib/apolloClient"
import { ApolloProvider } from "@apollo/client"

const theme = {
  colors: {
    primary: "#0070f3",
  },
}

function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

// Wraps all components in the tree with the data provider
export default MyApp
