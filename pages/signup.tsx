import { theme } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Heading from "../components/Heading";
import { signIn } from "next-auth/client";
import { Button } from "../components/Button";
import { useCustomSession } from "../components/Hooks";
import CenterSpinner from "../components/CenterSpinner";
import { NextPage } from "next";

const Signup: NextPage = (props) => {
  const router = useRouter();
  const [session, loading] = useCustomSession((session) => {
    if (session) router.push("/");
  });

  if (loading || session) {
    return <CenterSpinner />;
  }

  return (
    <>
      <Head>
        <title>signup / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Heading mb={theme.space[4]}>ユーザ登録</Heading>
      <Button w="240x" onClick={() => signIn("google")}>
        Google アカウントで登録
      </Button>
    </>
  );
};

export default Signup;
