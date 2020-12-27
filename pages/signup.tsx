import { chakra, Skeleton, Spinner, theme } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Heading from "../components/Heading";
import { signIn, signOut, useSession } from "next-auth/client";

const Signup: React.FC = (props) => {
  const [session, loading] = useSession();
  if (typeof window !== "undefined") {
    const router = useRouter();
    if (session) router.push("/");
  }

  if (loading || session) {
    return (
      <chakra.div
        pos="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%);"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </chakra.div>
    );
  }

  return (
    <>
      <Head>
        <title>signup / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Heading mb={theme.space[4]}>ユーザ登録</Heading>
      <chakra.a
        bgColor={theme.colors.blue[400]}
        padding={theme.space[3]}
        color={theme.colors.white}
        maxW="100%"
        width="240px"
        display="inline-block"
        textAlign="center"
        boxShadow={theme.shadows.md}
        cursor="pointer"
        borderRadius={theme.radii.md}
        tabIndex={0}
        _hover={{ bgColor: theme.colors.blue[600] }}
        _focus={{ bgColor: theme.colors.blue[600] }}
        onClick={() => signIn("google")}
      >
        Google アカウントで登録
      </chakra.a>
    </>
  );
};

export default Signup;
