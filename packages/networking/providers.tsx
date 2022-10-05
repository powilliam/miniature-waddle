import React from "react";
import { SWRConfig } from "swr";

import { NetworkingContext } from "./contexts";
import { useDefaultNetworkingFetcher } from "./hooks";

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
  const fetcher = useDefaultNetworkingFetcher(endpoints, interceptors);

  return (
    <NetworkingContext.Provider value={{ endpoints, interceptors, fetcher }}>
      <SWRConfig value={{ fetcher, fallback }}>{children}</SWRConfig>
    </NetworkingContext.Provider>
  );
};
