import { theme, BoxProps, chakra } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Heading from "./Heading";

const Article: React.FC<BoxProps & any> = (props) => {
  const maxBodyLength = 50;
  const { id, title, body, updatedAt } = props.post;
  const { name } = props.post.User;
  const detailButton = body.length > maxBodyLength;

  return (
    <chakra.article
      borderBottom={"1px solid" + theme.colors.gray[300]}
      pb={theme.space[4]}
    >
      <dl>
        <chakra.dt mb={theme.space[4]}>
          <time>{updatedAt}</time>
          <Heading
            maxW="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {title}
          </Heading>
        </chakra.dt>
        <dd>
          <chakra.section mb={theme.space[4]}>
            {detailButton ? body.substr(0, maxBodyLength) + "..." : body}
          </chakra.section>
          <chakra.aside
            display="flex"
            justifyContent={detailButton ? "space-between" : "flex-end"}
          >
            {detailButton && (
              <Link href={"/posts/" + id}>
                <chakra.a color={theme.colors.blue[500]}>続きを読む</chakra.a>
              </Link>
            )}
            <span>by {name}</span>
          </chakra.aside>
        </dd>
      </dl>
    </chakra.article>
  );
};

export default Article;
