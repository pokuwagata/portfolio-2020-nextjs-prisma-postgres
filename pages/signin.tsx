import { theme } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Heading from "../components/Heading";
import { signIn } from "next-auth/client";
import { LinkButton } from "../components/Button";
import { useCustomSession } from "../components/Hooks";
import CenterSpinner from "../components/CenterSpinner";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Signup: NextPage = () => {
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
        <title>signin / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Heading mb={theme.space[4]}>ログイン</Heading>
      <LinkButton w="240x" onClick={() => signIn("google")}>
        Google アカウントでログイン
      </LinkButton>
    </>
  );
};

export default Signup;
