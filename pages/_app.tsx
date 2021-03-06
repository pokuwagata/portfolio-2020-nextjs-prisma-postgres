import "css-wipe";
import { chakra, ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";

import ErrorBoundary from "../components/ErrorBoundary";
import ErrorBox from "../components/ErrorBox";
import Header from "../components/Header";

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
          <chakra.div padding={["0 16px", "0 32px"]}>
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
