import React from "react";
import { SWRConfig } from "swr";

import { NetworkingContext } from "./contexts";
import { useNetworkingClients, useNetworkingFetcher } from "./hooks";

interface ProviderProps {
  endpoints: Record<string, string[]>;
  interceptors?: Record<string, any>;
  fallback?: Record<string, any>;
  children?: React.ReactNode;
}

export const NetworkingProvider = ({
  endpoints,
  interceptors,
  fallback = {},
  children,
}: ProviderProps) => {
  const clients = useNetworkingClients(endpoints, interceptors);
  const fetcher = useNetworkingFetcher(clients);

  return (
    <NetworkingContext.Provider value={{ fetcher }}>
      <SWRConfig value={{ fetcher, fallback }}>{children}</SWRConfig>
    </NetworkingContext.Provider>
  );
};
