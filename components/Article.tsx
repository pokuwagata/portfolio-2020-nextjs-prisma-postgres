import { BoxProps, chakra, theme } from "@chakra-ui/react";

const Article: React.FC<BoxProps> = (props) => {
  return (
    <chakra.article
      borderBottom={"1px solid" + theme.colors.gray[300]}
      pb="1rem"
    >
      <dl>
        <chakra.dt
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="1rem"
        >
          <chakra.h2 fontSize={theme.fontSizes["3xl"]}>見出し2</chakra.h2>
          <time>2020/12/20 00:00:00</time>
        </chakra.dt>
        <dd>
          <chakra.section mb="1rem">テスト</chakra.section>
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
