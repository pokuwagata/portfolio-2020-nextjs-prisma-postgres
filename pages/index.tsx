import { chakra, theme } from "@chakra-ui/react";
import React from "react";
import Article from "../components/Article";
import Head from "next/head";

const Home: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <ul>
        <chakra.li mb={theme.space[8]}>
          <Article />
        </chakra.li>
        <chakra.li>
          <Article />
        </chakra.li>
      </ul>
    </>
  );
};

export default Home;
