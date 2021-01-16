import { chakra, theme } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import React from "react";

import Article from "../components/Article";
import Landing from "../components/Landing";
import Section from "../components/Section";
import prisma from "../lib/prisma";

type Props = { posts?: any[]; error?: string; hasSession: boolean };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) return { props: { hasSession: false } };

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
        hasSession: true,
      },
    };
  } catch (e) {
    return {
      props: {
        hasSession: false,
        error: e.message,
      },
    };
  }
};

const Home: NextPage<Props> = (props) => {
  const { hasSession, posts } = props;
  if (!hasSession)
    return (
      <>
        <Head>
          <title>portfolio-2020-nextjs-prisma-postgres</title>
        </Head>
        <Landing />
      </>
    );

  return (
    <>
      <Head>
        <title>home / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Section>
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
      </Section>
    </>
  );
};

export default Home;
