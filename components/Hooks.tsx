import { Session, useSession } from "next-auth/client";

export const useCustomSession = (callback: (session: Session) => void) => {
  const [session, loading] = useSession();
  if (typeof window !== "undefined") {
    callback(session);
  }
  return [session, loading];
};
