import "css-wipe";
import { Provider } from "next-auth/client";
import { chakra, ChakraProvider, theme } from "@chakra-ui/react";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Header mb={theme.space[4]} />
        <chakra.div maxW="1230px" padding="0 32px" margin="0 auto">
          <main>
            <Component {...pageProps} />
          </main>
        </chakra.div>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
