import { theme } from "@chakra-ui/react";
import Heading from "../../components/Heading";
import { useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import CenterSpinner from "../../components/CenterSpinner";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetServerSideProps, NextPage } from "next";
import FieldErrorMessage from "../../components/FieldErrorMessage";
import PostForm from "../../components/PostForm";
import { Post } from "../../types/post";
import prisma from "../../lib/prisma";

type Props = {
  post: Post;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const res = await prisma.post.findUnique({
    select: {
      id: true,
      title: true,
      body: true,
      updatedAt: true,
    },
    where: { id: parseInt(ctx.params.id as string) },
  });
  const post = await JSON.parse(JSON.stringify(res));
  return {
    props: {
      post,
    },
  };
};

const EditPost: NextPage<Props> = (props) => {
  const { post } = props;
  const router = useRouter();
  const [session, sessionLoading] = useSession();

  const mutation = useMutation((post: Post) => {
    return fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
  });

  if (sessionLoading) {
    return <CenterSpinner />;
  }

  if (!session || mutation.isSuccess) router.push("/");

  const onSubmit = (post: Post) => {
    mutation.mutate(post);
  };

  return (
    <>
      <Head>
        <title>{post.title} / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Heading mb={theme.space[4]}>記事の編集</Heading>
      {mutation.isError && (
        <FieldErrorMessage>{mutation.error}</FieldErrorMessage>
      )}
      <PostForm submitCallBack={onSubmit} {...{ post }}>
        <Button type="submit" w={theme.space[20]}>
          更新
        </Button>
      </PostForm>
    </>
  );
};

export default EditPost;
