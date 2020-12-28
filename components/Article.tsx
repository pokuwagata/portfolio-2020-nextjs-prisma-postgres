import { theme, BoxProps, chakra } from "@chakra-ui/react";
import React from "react";
import { Post, User } from "../lib/prisma";
import Heading from "./Heading";

const Article: React.FC<
  BoxProps & {
    post: Pick<Post, "title" | "body" | "updatedAt">;
    user: Pick<User, "name">;
  }
> = (props) => {
  const { title, body, updatedAt } = props.post;
  const { name } = props.user;

  return (
    <chakra.article
      borderBottom={"1px solid" + theme.colors.gray[300]}
      pb={theme.space[4]}
    >
      <dl>
        <chakra.dt
          display="flex"
          justifyContent="space-between"
          alignItems={{ base: "start", sm: "center" }}
          flexDir={{ base: "column", sm: "row" }}
          mb={theme.space[4]}
        >
          <Heading>{title}</Heading>
          <time>{updatedAt}</time>
        </chakra.dt>
        <dd>
          <chakra.section mb={theme.space[4]}>{body}</chakra.section>
          <chakra.aside display="flex" justifyContent="space-between">
            <chakra.a display="inline-block">続きを読む</chakra.a>
            <chakra.span display="inline-block">by {name}</chakra.span>
          </chakra.aside>
        </dd>
      </dl>
    </chakra.article>
  );
};

export default Article;
