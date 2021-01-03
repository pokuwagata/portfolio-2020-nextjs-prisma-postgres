import { theme, BoxProps, chakra } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import Heading from "./Heading";

const ArticleDetail: React.FC<BoxProps & any> = (props) => {
  const { title, body, updatedAt } = props.post;
  const { name } = props.post.User;

  return (
    <chakra.article pb={theme.space[4]}>
      <dl>
        <chakra.dt mb={theme.space[4]}>
          <time>{dayjs(updatedAt).format("YYYY-MM-DD")}</time>
          <Heading>{title}</Heading>
        </chakra.dt>
        <dd>
          <chakra.section mb={theme.space[4]}>{body}</chakra.section>
          <chakra.aside display="flex" justifyContent="flex-end">
            <span>by {name}</span>
          </chakra.aside>
        </dd>
      </dl>
    </chakra.article>
  );
};

export default ArticleDetail;
