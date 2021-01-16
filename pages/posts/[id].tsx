import { GetServerSideProps, NextPage } from "next";

import ArticleDetail from "../../components/ArticleDetail";
import prisma from "../../lib/prisma";
import { PostViewResponse } from "../../types/post";

type Props = {
  post?: PostViewResponse;
  error?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const res = await prisma.post.findUnique({
      select: {
        id: true,
        title: true,
        body: true,
        updatedAt: true,
        User: {
          select: { name: true },
        },
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

const ArticlePage: NextPage<Props> = (props) => {
  const { post } = props;
  return <ArticleDetail {...{ post }} />;
};

export default ArticlePage;
