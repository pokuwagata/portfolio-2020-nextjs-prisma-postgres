import { chakra, theme } from "@chakra-ui/react";
import React from "react";
import Article from "../components/Article";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import prisma, { Post, User } from "../lib/prisma";

type PostData = Partial<Post & { User: User }>;
type Props = { posts: PostData[] };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
            <chakra.li mb={theme.space[8]} _last={{ mb: 0 }} key={post.id}>
              <Article
                post={{
                  title: post.title,
                  body: post.body,
                  updatedAt: post.updatedAt,
                }}
                user={{ name: post.User.name }}
              />
            </chakra.li>
          ))}
        </chakra.ul>
      )}
    </>
  );
};

export default Home;
