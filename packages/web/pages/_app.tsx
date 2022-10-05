import "@packages/firebase/setup-next";

import "../styles/globals.css";

import type { AppProps } from "next/app";
import {
  FirebaseProvider,
  FeaturesProvider,
} from "@packages/firebase/providers";

import { HomeServerSideProps } from "./index";

function MyApp({ Component, pageProps }: AppProps<HomeServerSideProps>) {
  return (
    <FirebaseProvider>
      <FeaturesProvider initialValue={pageProps?.features}>
        <Component {...pageProps} />
      </FeaturesProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
