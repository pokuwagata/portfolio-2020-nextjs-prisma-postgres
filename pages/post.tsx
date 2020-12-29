import { chakra, Input, Textarea, theme } from "@chakra-ui/react";
import Heading from "../components/Heading";
import { useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import CenterSpinner from "../components/CenterSpinner";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { useMutation, useQueryClient } from "react-query";
import { NextPage } from "next";
import FieldErrorMessage from "../components/FieldErrorMessage";

type Post = {
  title: string;
  body: string;
};

const Post: NextPage = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { register, handleSubmit, errors } = useForm({ mode: "all" });
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (post: Post) => {
      return fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const onSubmit = (post: Post) => {
    if (Object.keys(errors).length > 0) return;
    mutation.mutate(post);
  };

  if (loading) {
    return <CenterSpinner />;
  }

  if (!session || mutation.isSuccess) router.push("/");

  return (
    <>
      <Head>
        <title>post / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Heading mb={theme.space[4]}>記事の投稿</Heading>
      {mutation.isError && (
        <FieldErrorMessage>{mutation.error}</FieldErrorMessage>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <chakra.div mb={theme.space[4]}>
          {errors.title && (
            <FieldErrorMessage>{errors.title.message}</FieldErrorMessage>
          )}
          <Input
            placeholder="タイトルを入力"
            name="title"
            ref={register({
              required: "タイトルを入力してください",
              maxLength: {
                value: 100,
                message: "タイトルが 100 文字を超えています",
              },
            })}
            isInvalid={errors.title}
            focusBorderColor={errors.title && theme.colors.red[600]}
            maxLength={100}
          />
        </chakra.div>
        <div>
          {errors.body && (
            <FieldErrorMessage>{errors.body.message}</FieldErrorMessage>
          )}
          <Textarea
            rows={10}
            placeholder="本文を入力"
            name="body"
            ref={register({
              required: "本文を入力してください",
              maxLength: {
                value: 1000,
                message: "本文が 1000 文字を超えています",
              },
            })}
            isInvalid={errors.body}
            mb={theme.space[4]}
            focusBorderColor={errors.body && theme.colors.red[600]}
            maxLength={1000}
          />
        </div>
        {/* TODO: 余白調整が必要な理由 */}
        <Button type="submit" w={theme.space[20]} mt={"-" + theme.space[2]}>
          投稿
        </Button>
      </form>
    </>
  );
};

export default Post;
