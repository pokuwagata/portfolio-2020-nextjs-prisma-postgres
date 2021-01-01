import { theme } from "@chakra-ui/react";
import Heading from "../../components/Heading";
import { useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import CenterSpinner from "../../components/CenterSpinner";
import { useRouter } from "next/router";
import { Button, LoadingButton } from "../../components/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetServerSideProps, NextPage } from "next";
import FieldErrorMessage from "../../components/FieldErrorMessage";
import PostForm from "../../components/PostForm";
import { PostReqInput, PostResponse } from "../../types/post";
import prisma from "../../lib/prisma";

type Props = {
  post?: PostResponse;
  error?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const res = await prisma.post.findUnique({
      select: {
        id: true,
        title: true,
        body: true,
        userId: true,
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
  } catch (e) {
    return {
      props: {
        error: e.message,
      },
    };
  }
};

const EditPost: NextPage<Props> = (props) => {
  const { post } = props;
  const router = useRouter();
  const [session, sessionLoading] = useSession();

  const mutation = useMutation(async (post: PostReqInput) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  });

  if (sessionLoading) {
    return <CenterSpinner />;
  }

  if (!session || mutation.isSuccess) router.push("/");

  const spinnerVisible = mutation.isLoading || mutation.isSuccess;

  const onSubmit = (post: PostReqInput) => {
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
        {spinnerVisible ? (
          <LoadingButton type="submit" w={theme.space[20]} />
        ) : (
          <Button type="submit" w={theme.space[20]}>
            更新
          </Button>
        )}
      </PostForm>
    </>
  );
};

export default EditPost;
