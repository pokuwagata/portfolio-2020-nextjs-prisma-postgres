import { theme } from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";

import { Button, LoadingButton } from "../components/Button";
import CenterSpinner from "../components/CenterSpinner";
import FieldErrorMessage from "../components/FieldErrorMessage";
import Heading from "../components/Heading";
import PostForm from "../components/PostForm";
import { PostReqInput } from "../types/post";

const NewPost: NextPage = () => {
  const router = useRouter();
  const [session, loading] = useSession();
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

  if (loading) {
    return <CenterSpinner />;
  }
  if (!session || mutation.isSuccess) router.push("/");

  if (mutation.isError) throw mutation.error;

  const spinnerVisible = mutation.isLoading || mutation.isSuccess;

  const onSubmit = (post: PostReqInput) => {
    mutation.mutate({ ...post, userId: session.user.id });
  };

  return (
    <>
      <Head>
        <title>post / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Heading mb={theme.space[4]}>記事の投稿</Heading>
      {mutation.isError && (
        <FieldErrorMessage>{mutation.error}</FieldErrorMessage>
      )}
      <PostForm submitCallBack={onSubmit}>
        {spinnerVisible ? (
          <LoadingButton type="submit" w={theme.space[20]} />
        ) : (
          <Button type="submit" w={theme.space[20]}>
            投稿
          </Button>
        )}
      </PostForm>
    </>
  );
};

export default NewPost;
