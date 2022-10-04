import "@packages/firebase";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { FeaturesProvider } from "@packages/firebase/providers";

import { HomeServerSideProps } from "./index";

function MyApp({ Component, pageProps }: AppProps<HomeServerSideProps>) {
  return (
    <FeaturesProvider initialValue={pageProps?.features}>
      <Component {...pageProps} />
    </FeaturesProvider>
  );
}

export default MyApp;
