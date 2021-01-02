import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  BoxProps,
  Button,
  chakra,
  Skeleton,
  theme,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/client";
import Link from "next/link";
import React from "react";

type Props = {
  innerStyle?: BoxProps;
  outerStyle?: BoxProps;
};

const Header: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  const { innerStyle, outerStyle } = props;

  return (
    <chakra.header
      bgColor={theme.colors.gray[50]}
      pt={theme.space[4]}
      pb={theme.space[4]}
      color={theme.colors.gray[600]}
      {...outerStyle}
    >
      <chakra.div display="flex" justifyContent="space-between" {...innerStyle}>
        <chakra.ul display="inline-flex" alignItems="center">
          <chakra.li mr={theme.space[4]}>
            <h1>
              <Link href="/">Home</Link>
            </h1>
          </chakra.li>
          <Skeleton isLoaded={!loading}>
            {session && (
              <chakra.li maxW={theme.space[60]}>{session.user.name}</chakra.li>
            )}
          </Skeleton>
        </chakra.ul>
        <nav>
          <Skeleton isLoaded={!loading}>
            <chakra.ul display="inline-flex">
              {session ? <Authorized /> : <Original />}
            </chakra.ul>
          </Skeleton>
        </nav>
      </chakra.div>
    </chakra.header>
  );
};

const Original: React.FC = () => {
  return (
    <>
      <li>
        <a href="/signin">ログイン</a>
      </li>
    </>
  );
};

const Authorized: React.FC = () => {
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          menu
        </MenuButton>
        <MenuList>
          <MenuItem as="a" href="/post">
            投稿
          </MenuItem>
          <MenuItem as="a" href="/manage">
            管理
          </MenuItem>
          <MenuItem as="a" onClick={() => signOut()}>
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
      {/* <chakra.li mr={theme.space[4]} w={theme.space[8]} cursor="pointer">
        <Link href="/post">投稿</Link>
      </chakra.li>
      <chakra.li mr={theme.space[4]} w={theme.space[8]} cursor="pointer">
        <Link href="/manage">管理</Link>
      </chakra.li>
      <chakra.li w={theme.space[20]} cursor="pointer">
        <a onClick={() => signOut()}>ログアウト</a>
      </chakra.li> */}
    </>
  );
};

export default Header;
