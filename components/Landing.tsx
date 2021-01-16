import { chakra, theme } from "@chakra-ui/react";

import { LinkButton } from "./Button";

const Landing: React.FC = () => {
  return (
    <chakra.section pt={[theme.space[12], theme.space[32]]}>
      <chakra.div mr="auto" ml="auto" textAlign="center">
        <chakra.h1
          fontSize={[theme.fontSizes["3xl"], theme.fontSizes["5xl"]]}
          fontWeight={theme.fontWeights.bold}
          color={theme.colors.gray[700]}
          mb={theme.space[6]}
          lineHeight={theme.lineHeights.none}
        >
          <chakra.p mb={theme.space[2]}>portfolio-2020</chakra.p>
          <chakra.p color={theme.colors.blue[500]}>
            nextjs-prisma-postgres
          </chakra.p>
        </chakra.h1>
        <p>Next.js の勉強用に作成したサービスです。</p>
        <chakra.p mb={theme.space[6]}>
          ログインすると記事の閲覧や投稿ができます。
        </chakra.p>
        <div>
          <LinkButton w={theme.space[24]} mr={theme.space[4]} href="/signin">
            ログイン
          </LinkButton>
          <LinkButton
            bgColor={theme.colors.gray[600]}
            w={theme.space[24]}
            href="https://github.com/pokuwagata/portfolio-2020-nextjs-prisma-postgres"
          >
            Github
          </LinkButton>
        </div>
      </chakra.div>
    </chakra.section>
  );
};

export default Landing;
