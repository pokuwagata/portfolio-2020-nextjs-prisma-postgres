import { signIn, signOut, useSession } from "next-auth/client";
export default function Test() {
  const [session] = useSession();
  return (
    <>
      {!session && (
        <>
          サインインしてください。 <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          サインイン完了。 email: {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
