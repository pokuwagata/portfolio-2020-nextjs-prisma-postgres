import { useSession } from "next-auth/client";

export const useCustomSession = (callback: () => void) => {
  const [session, loading] = useSession();
  if (typeof window !== "undefined") {
    callback();
  }
  return [session, loading];
};
