import "../styles/globals.css";

import type { AppProps } from "next/app";
import { initializeWithOptions } from "@packages/firebase";
import {
  FirebaseProvider,
  FeaturesProvider,
} from "@packages/firebase/providers";
import { NetworkingProvider } from "@packages/networking/providers";

import { HomeServerSideProps } from "./index";

initializeWithOptions({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});

const networking = {
  endpoints: {
    "https://jsonplaceholder.typicode.com": ["users"],
  },
  interceptors: {
    "*": {
      headers: { "x-client-hello": "world" },
    },
    "https://jsonplaceholder.typicode.com": {
      headers: { "x-client-endpoint": "users" },
    },
  },
};

function MyApp({ Component, pageProps }: AppProps<HomeServerSideProps>) {
  return (
    <NetworkingProvider {...networking} fallback={pageProps?.fallback}>
      <FirebaseProvider>
        <FeaturesProvider initialValue={pageProps?.features}>
          <Component {...pageProps} />
        </FeaturesProvider>
      </FirebaseProvider>
    </NetworkingProvider>
  );
}

export default MyApp;
