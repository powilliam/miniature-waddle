import { useContext } from "react";
import useStaleWhileRevalidate from "swr";
import type { SWRConfiguration, Key } from "swr";

import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance } from "axios";

import { NetworkingContext } from "./contexts";

interface NetworkingServiceCallConfig {
  key?: Key;
  url: string;
  config?: AxiosRequestConfig;
  staleWhileRevalidateConfig?: SWRConfiguration;
}

export const useNetworkingServiceCall = <T>({
  key,
  url,
  config = {},
  staleWhileRevalidateConfig,
}: NetworkingServiceCallConfig) => {
  const { fetcher } = useNetworkingConfig();

  if (!key) {
    return useStaleWhileRevalidate([url, config], staleWhileRevalidateConfig);
  }

  return useStaleWhileRevalidate(
    key,
    () => fetcher([url, config]),
    staleWhileRevalidateConfig
  );
};

export const useNetworkingClients = (
  endpoints: Record<string, string[]>,
  interceptors?: Record<symbol | string, any>
) => {
  return Object.entries(endpoints).reduce((clients, [baseURL, urls]) => {
    const instance = axios.create({
      baseURL,
    });

    instance.interceptors.request.use((config) =>
      Object.assign({}, config, interceptors?.[baseURL])
    );

    return {
      ...clients,
      [baseURL]: {
        urls,
        instance,
      },
    };
  }, {});
};

export const useNetworkingFetcher = (
  clients: Record<string, { urls: string[]; instance: AxiosInstance }>
) => {
  return ([url, config = {}]: [string, Partial<AxiosRequestConfig<any>>]) => {
    const client = Object.values(clients).find((client) =>
      client.urls.includes(url)
    );

    if (!client) {
      return console.warn(
        `Missing domain configuration for [${url}] at NetworkingProvider`
      );
    }

    return client?.instance(url, config);
  };
};

export const useNetworkingConfig = () => useContext(NetworkingContext);
