import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { queryClient } from "../lib/query-client";
import { FontProvider } from "./font-provider";
import { SessionProvider } from "./session-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <FontProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </FontProvider>
  );
}
