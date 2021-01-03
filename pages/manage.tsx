import {
  chakra,
  TableCellProps,
  TableColumnHeaderProps,
  theme,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import {
  Button,
  LinkButton,
  DisabledButton,
  LoadingButton,
} from "../components/Button";
import Heading from "../components/Heading";
import CenterSpinner from "../components/CenterSpinner";
import React, { ChangeEvent, useState } from "react";
import CheckBox from "../components/CheckBox";
import prisma, { Post } from "../lib/prisma";
import { useMutation } from "react-query";
import DeleteDialog from "../components/DeleteDialog";
import dayjs from "dayjs";

type Props = { posts?: Post[]; error?: string };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx);
  try {
    const res = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
      where: {
        userId: session.user.id,
      },
      orderBy: { createdAt: "desc" },
    });
    const posts = await JSON.parse(JSON.stringify(res));
    return {
      props: {
        posts,
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

const Manage: NextPage<Props> = (props) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const mutation = useMutation(async (query: string) => {
    const res = await fetch("/api/posts" + query, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  });

  if (loading) {
    return <CenterSpinner />;
  }

  if (!session) router.push("/");

  if (mutation.isSuccess) {
    router.reload();
  }

  if (mutation.isError) throw mutation.error;

  const spinnerVisible = mutation.isLoading || mutation.isSuccess;

  const onDeleteClick = () => {
    let query = "?id=" + selectedIds[0];
    for (let i = 1; i < selectedIds.length; i++) {
      query += "&id=" + selectedIds[i];
    }
    mutation.mutate(query);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Head>
        <title>manage / portfolio-2020-nextjs-prisma-postgres</title>
      </Head>
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
        onDeleteClick={onDeleteClick}
        count={selectedIds.length}
      />
      <Heading mb={theme.space[4]}>記事の管理</Heading>
      <chakra.div textAlign="right" mb={theme.space[4]} pr={theme.space[2]}>
        {selectedIds.length > 0 ? (
          spinnerVisible ? (
            <LoadingButton
              w={theme.space[12]}
              bgColor={theme.colors.red[200]}
            />
          ) : (
            <Button
              w={theme.space[12]}
              fontSize={theme.fontSizes.sm}
              bgColor={theme.colors.red[600]}
              _hover={{ bgColor: theme.colors.red[700] }}
              _focus={{ bgColor: theme.colors.red[700] }}
              onClick={() => {
                setDeleteDialogOpen(true);
              }}
            >
              削除
            </Button>
          )
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
              <Header w="20%" display={["none", "table-cell"]}>
                更新日時
              </Header>
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
                <Cell
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  <label htmlFor={post.id.toString()}>{post.title}</label>
                </Cell>
                <Cell display={["none", "table-cell"]}>
                  {dayjs(post.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </Cell>
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
