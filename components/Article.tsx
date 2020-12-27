import { theme, BoxProps, chakra } from "@chakra-ui/react";
import React from "react";
import Heading from "./Heading";

const Article: React.FC<BoxProps> = (props) => {
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
          <Heading>見出し2</Heading>
          <time>2020/12/20 00:00:00</time>
        </chakra.dt>
        <dd>
          <chakra.section mb={theme.space[4]}>テスト</chakra.section>
          <chakra.aside display="flex" justifyContent="space-between">
            <chakra.a display="inline-block">続きを読む</chakra.a>
            <chakra.span display="inline-block">by user1</chakra.span>
          </chakra.aside>
        </dd>
      </dl>
    </chakra.article>
  );
};

export default Article;
