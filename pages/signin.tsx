import { theme } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Heading from "../components/Heading";
import { signIn } from "next-auth/client";
import Button from "../components/Button";
import { useCustomSession } from "../components/Hooks";
import CenterSpinner from "../components/CenterSpinner";

const Signup: React.FC = (props) => {
  const [session, loading] = useCustomSession();

  if (loading || session) {
    return <CenterSpinner />;
  }

  return (
    <>
      <Head>
        <title>signin / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Heading mb={theme.space[4]}>ログイン</Heading>
      <Button w="240x" onClick={() => signIn("google")}>
        Google アカウントでログイン
      </Button>
    </>
  );
};

export default Signup;
