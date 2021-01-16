import { chakra, theme } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";

import Article from "../components/Article";
import prisma from "../lib/prisma";

type Props = { posts?: any[]; error?: string };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const res = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        body: true,
        updatedAt: true,
        User: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const posts = await JSON.parse(JSON.stringify(res));
    return {
      props: {
        posts,
      },
    };
  } catch (e) {
    return {
      props: {
        error: e.message,
      },
    };
  }
};

const Home: NextPage<Props> = (props) => {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      {posts.length === 0 ? (
        <p>記事がありません</p>
      ) : (
        <chakra.ul>
          {posts.map((post) => (
            <chakra.li mb={theme.space[4]} _last={{ mb: 0 }} key={post.id}>
              <Article {...{ post }} />
            </chakra.li>
          ))}
        </chakra.ul>
      )}
    </>
  );
};

export default Home;
