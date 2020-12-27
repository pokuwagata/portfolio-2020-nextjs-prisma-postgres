import { BoxProps, chakra, Link, Skeleton, theme } from "@chakra-ui/react";
import { useSession } from "next-auth/client";

const Header: React.FC<BoxProps> = (props) => {
  const [session, loading] = useSession();

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
        <Link href="/" display="inline-block">
          Home
        </Link>
      </h1>
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
        <a href="#">ログイン</a>
      </li>
    </>
  );
};

const Authorized: React.FC = () => {
  return (
    <>
      <chakra.li mr={theme.space[4]}>
        <Link href="/">投稿</Link>
      </chakra.li>
      <chakra.li mr={theme.space[4]}>
        <Link href="/">管理</Link>
      </chakra.li>
      <li>
        <a href="#">ログアウト</a>
      </li>
    </>
  );
};

export default Header;
