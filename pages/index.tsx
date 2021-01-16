import { chakra, theme } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import React from "react";

import Article from "../components/Article";
import { LinkButton } from "../components/Button";
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
        <chakra.section pt={[theme.space[12], theme.space[32]]}>
          <chakra.div mr="auto" ml="auto" textAlign="center">
            <chakra.h1
              fontSize={[theme.fontSizes["3xl"], theme.fontSizes["5xl"]]}
              fontWeight={theme.fontWeights.bold}
              color={theme.colors.gray[700]}
              mb={theme.space[6]}
              lineHeight={theme.lineHeights.none}
            >
              <chakra.p mb={theme.space[2]}>portfolio-2020</chakra.p>
              <chakra.p color={theme.colors.blue[500]}>
                nextjs-prisma-postgres
              </chakra.p>
            </chakra.h1>
            <p>Next.js の勉強のために作成したサービスです。</p>
            <chakra.p mb={theme.space[6]}>
              ログインすると記事の投稿や閲覧ができます。
            </chakra.p>
            <div>
              <LinkButton
                w={theme.space[24]}
                mr={theme.space[4]}
                href="/signin"
              >
                ログイン
              </LinkButton>
              <LinkButton
                bgColor={theme.colors.gray[600]}
                w={theme.space[24]}
                href="https://github.com/pokuwagata/portfolio-2020-nextjs-prisma-postgres"
              >
                Github
              </LinkButton>
            </div>
          </chakra.div>
        </chakra.section>
      </>
    );

  return (
    <>
      <Head>
        <title>home / portfolio-2020-nextjs-prisma-postgres</title>
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
