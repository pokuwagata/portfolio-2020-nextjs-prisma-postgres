import "css-wipe";
import { Provider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />;
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
