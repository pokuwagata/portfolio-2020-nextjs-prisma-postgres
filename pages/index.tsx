import { chakra, theme } from "@chakra-ui/react";
import React from "react";
import Article from "../components/Article";
import Header from "../components/Header";

const Home: React.FC = (props) => {
  return (
    <>
      <Header mb={theme.space[4]} />
      <chakra.div maxW="1230px" padding="0 32px" margin="0 auto">
        <main>
          <ul>
            <chakra.li mb={theme.space[8]}>
              <Article />
            </chakra.li>
            <chakra.li>
              <Article />
            </chakra.li>
          </ul>
        </main>
      </chakra.div>
    </>
  );
};

export default Home;
