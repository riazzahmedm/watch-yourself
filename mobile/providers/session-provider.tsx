import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

type SessionContextValue = {
  isLoading: boolean;
  session: Session | null;
};

export const SessionContext = createContext<SessionContextValue>({
  isLoading: true,
  session: null,
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) {
        return;
      }

      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ isLoading, session }}>
      {children}
    </SessionContext.Provider>
  );
}
