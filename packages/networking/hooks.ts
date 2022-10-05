import { useContext } from "react";
import useStaleWhileRevalidate from "swr";
import type { SWRConfiguration, Key } from "swr";

import axios from "axios";
import type { AxiosRequestConfig } from "axios";

import { NetworkingContext } from "./contexts";

interface NetworkingServiceCallConfig {
  key?: Key;
  path: string;
  config?: AxiosRequestConfig;
  staleWhileRevalidateConfig?: SWRConfiguration;
}

export const useNetworkingServiceCall = <T>({
  key,
  path,
  config = {},
  staleWhileRevalidateConfig,
}: NetworkingServiceCallConfig) => {
  const { fetcher } = useNetworkingConfig();

  if (!key) {
    return useStaleWhileRevalidate([path, config], staleWhileRevalidateConfig);
  }

  return useStaleWhileRevalidate(
    key,
    () => fetcher<T>([path, config]),
    staleWhileRevalidateConfig
  );
};

export const useDefaultNetworkingFetcher = (
  endpoints: Record<string, string[]>,
  interceptors?: Record<symbol | string, any>
) => {
  const domains = Object.keys(endpoints);
  const paths = Object.values(endpoints);

  return <T = {}>([url, config = {}]: [
    string,
    Partial<AxiosRequestConfig<any>>
  ]) => {
    const baseURL = paths.reduce((_, paths, position) => {
      return !paths.includes(url) ? "NO_DOMAIN" : domains[position];
    }, "NO_DOMAIN");

    switch (baseURL) {
      case "NO_DOMAIN":
        return Promise.reject("Missing domain");
      default:
        const client = axios.create({
          baseURL,
        });

        client.interceptors.request.use((config) => ({
          ...config,
          ...interceptors?.["*"],
          ...interceptors?.[baseURL],
        }));

        return client<T>(url, config);
    }
  };
};

export const useNetworkingConfig = () => useContext(NetworkingContext);
