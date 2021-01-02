import "css-wipe";
import { Provider } from "next-auth/client";
import { chakra, ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/Header";
import ErrorBox from "../components/ErrorBox";
import ErrorBoundary from "../components/ErrorBoundary";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        session={pageProps.session}
        options={{
          clientMaxAge: 5 * 60, // Re-fetch session if cache is older than 60 seconds
          keepAlive: 5 * 60, // Send keepAlive message every 5 minutes
        }}
      >
        <ChakraProvider>
          <Header
            outerStyle={{ mb: theme.space[4] }}
            innerStyle={{
              maxW: "1230px",
              padding: ["0 16px", "0 32px"],
              margin: "0 auto",
            }}
          />
          <chakra.div
            maxW="1230px"
            padding={["0 16px", "0 32px"]}
            margin="0 auto"
          >
            <main>
              {pageProps.error ? (
                <ErrorBox message={pageProps.error} />
              ) : (
                <ErrorBoundary>
                  <Component {...pageProps} />
                </ErrorBoundary>
              )}
            </main>
          </chakra.div>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
