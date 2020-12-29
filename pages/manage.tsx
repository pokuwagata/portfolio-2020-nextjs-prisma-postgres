import {
  chakra,
  TableCellProps,
  TableColumnHeaderProps,
  theme,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Button, LinkButton, DisabledButton } from "../components/Button";
import Heading from "../components/Heading";
import CenterSpinner from "../components/CenterSpinner";
import { ChangeEvent, useState } from "react";
import CheckBox from "../components/CheckBox";
import prisma, { Post } from "../lib/prisma";

type Props = { posts: Post[] };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const res = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      updatedAt: true,
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

const Manage: NextPage<Props> = (props) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [selectedIds, setSelectedIds] = useState([]);

  if (loading) {
    return <CenterSpinner />;
  }

  if (!session) router.push("/");

  return (
    <>
      <Head>
        <title>manage / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <Heading mb={theme.space[4]}>記事の管理</Heading>
      <chakra.div textAlign="right" mb={theme.space[4]} pr={theme.space[2]}>
        {selectedIds.length > 0 ? (
          <Button
            w={theme.space[12]}
            fontSize={theme.fontSizes.sm}
            bgColor={theme.colors.red[600]}
            _hover={{ bgColor: theme.colors.red[700] }}
            _focus={{ bgColor: theme.colors.red[700] }}
          >
            削除
          </Button>
        ) : (
          <DisabledButton
            w={theme.space[12]}
            fontSize={theme.fontSizes.sm}
            bgColor={theme.colors.red[200]}
          >
            削除
          </DisabledButton>
        )}
      </chakra.div>
      {props.posts.length === 0 ? (
        <p>記事がありません</p>
      ) : (
        <chakra.table w="100%" style={{ tableLayout: "fixed" }}>
          <chakra.thead bgColor={theme.colors.gray[100]}>
            <chakra.tr fontWeight={theme.fontWeights.bold} textAlign="left">
              <Header w="24px" textAlign="center">
                <CheckBox
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      setSelectedIds(props.posts.map((post: Post) => post.id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
              </Header>
              <Header>タイトル</Header>
              <Header w="20%">更新日時</Header>
              <Header w={theme.space[16]} textAlign="center">
                管理
              </Header>
            </chakra.tr>
          </chakra.thead>
          <tbody>
            {props.posts.map((post: Post) => (
              <chakra.tr key={post.id}>
                <Cell textAlign="center">
                  <CheckBox
                    id={post.id}
                    checked={selectedIds.includes(post.id)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.checked) {
                        setSelectedIds([...selectedIds, post.id]);
                      } else {
                        setSelectedIds(
                          selectedIds.filter((id) => id !== post.id)
                        );
                      }
                    }}
                  />
                </Cell>
                <Cell>
                  <label htmlFor={post.id.toString()}>{post.title}</label>
                </Cell>
                <Cell>{post.updatedAt}</Cell>
                <Cell textAlign="center">
                  <LinkButton
                    w={theme.space[12]}
                    fontSize={theme.fontSizes.sm}
                    href={"/edit/" + post.id}
                  >
                    編集
                  </LinkButton>
                </Cell>
              </chakra.tr>
            ))}
          </tbody>
        </chakra.table>
      )}
    </>
  );
};

const Header: React.FC<TableColumnHeaderProps> = (props) => (
  <chakra.th p={theme.space[2]} {...props}>
    {props.children}
  </chakra.th>
);

const Cell: React.FC<TableCellProps> = (props) => (
  <chakra.td p={theme.space[2]} verticalAlign="middle" {...props}>
    {props.children}
  </chakra.td>
);

export default Manage;
