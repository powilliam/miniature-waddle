import type { FirebaseApp } from "firebase/app";
import type { Database as FirebaseDatabase } from "firebase/database";

import { createContext } from "react";

export interface FirebaseContextValues {
  app?: FirebaseApp;
  database?: FirebaseDatabase;
}

export interface FeatureContextValues {
  isAutoAuthenticationEnabled: boolean;
  isGreetingsEnabled: boolean;
}

export const FirebaseContext = createContext<FirebaseContextValues>({});

export const FeaturesContext = createContext<FeatureContextValues>({
  isAutoAuthenticationEnabled: false,
  isGreetingsEnabled: false,
});
