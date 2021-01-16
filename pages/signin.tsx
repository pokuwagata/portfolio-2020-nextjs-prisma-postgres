import { chakra, theme } from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { LinkButton } from "../components/Button";
import CenterSpinner from "../components/CenterSpinner";
import Heading from "../components/Heading";
import { useCustomSession } from "../components/Hooks";
import Section from "../components/Section";

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
      <Section>
        <Heading mb={theme.space[4]}>ログイン</Heading>
        <chakra.p mb={theme.space[4]}>
          新規登録、またはログインを行います。
        </chakra.p>
        <LinkButton w="240x" onClick={() => signIn("google")}>
          Google アカウントでログイン
        </LinkButton>
      </Section>
    </>
  );
};

export default Signup;
