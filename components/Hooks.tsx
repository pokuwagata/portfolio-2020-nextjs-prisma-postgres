import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

export const useCustomSession = () => {
  const [session, loading] = useSession();
  if (typeof window !== "undefined") {
    const router = useRouter();
    if (session) router.push("/");
  }
  return [session, loading];
};
