import { createContext } from "react";

import { useNetworkingFetcher } from "./hooks";

interface NetworkingContextValues {
  fetcher: ReturnType<typeof useNetworkingFetcher>;
}

export const NetworkingContext = createContext<NetworkingContextValues>(
  {} as NetworkingContextValues
);
