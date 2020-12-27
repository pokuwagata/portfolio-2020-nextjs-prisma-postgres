import { BoxProps, chakra, Link, Skeleton, theme } from "@chakra-ui/react";
import { useSession } from "next-auth/client";

const Header: React.FC<BoxProps> = (props) => {
  const [session, loading] = useSession();

  return (
    <chakra.header
      bgColor={theme.colors.gray[50]}
      padding={theme.space[4]}
      display="flex"
      justifyContent="space-between"
      color={theme.colors.gray[600]}
      {...props}
    >
      <chakra.ul display="inline-flex">
        <chakra.li mr={theme.space[4]}>
          <chakra.h1 display="inline-block">
            <Link href="/">Home</Link>
          </chakra.h1>
        </chakra.li>
        <Skeleton isLoaded={!loading}>
          {session && (
            <chakra.li display="inline-block" maxW={theme.space[60]}>
              {session.user.name}
            </chakra.li>
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
    </chakra.header>
  );
};

const Original: React.FC = () => {
  return (
    <>
      <chakra.li mr={theme.space[4]}>
        <Link href="/signup">ユーザ登録</Link>
      </chakra.li>
      <li>
        <a href="/signin">ログイン</a>
      </li>
    </>
  );
};

const Authorized: React.FC = () => {
  return (
    <>
      <chakra.li mr={theme.space[4]} W={theme.space[8]}>
        <Link href="/">投稿</Link>
      </chakra.li>
      <chakra.li mr={theme.space[4]} W={theme.space[8]}>
        <Link href="/">管理</Link>
      </chakra.li>
      <chakra.li W={theme.space[40]}>
        <a href="#">ログアウト</a>
      </chakra.li>
    </>
  );
};

export default Header;
