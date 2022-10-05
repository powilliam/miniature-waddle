import { createContext } from "react";

import { useDefaultNetworkingFetcher } from "./hooks";

interface NetworkingContextValues {
  endpoints: Record<string, string[]>;
  interceptors?: Record<symbol | string, any>;
  fetcher: ReturnType<typeof useDefaultNetworkingFetcher>;
}

export const NetworkingContext = createContext<NetworkingContextValues>(
  {} as NetworkingContextValues
);
