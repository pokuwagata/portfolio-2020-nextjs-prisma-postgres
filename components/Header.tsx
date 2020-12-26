import { BoxProps, chakra, theme } from "@chakra-ui/react";

const Header: React.FC<BoxProps> = (props) => {
  return (
    <chakra.header
      bgColor={theme.colors.gray[50]}
      padding="16px"
      display="flex"
      justifyContent="space-between"
      color={theme.colors.gray[600]}
      {...props}
    >
      <h1>
        <chakra.a display="inline-block">Home</chakra.a>
      </h1>
      <nav>
        <chakra.ul display="inline-flex">
          <chakra.li mr="8px">
            <a>ユーザ登録</a>
          </chakra.li>
          <li>
            <a>ログイン</a>
          </li>
        </chakra.ul>
      </nav>
    </chakra.header>
  );
};

export default Header;
