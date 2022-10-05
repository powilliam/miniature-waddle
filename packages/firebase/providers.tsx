import React from "react";
import { FirebaseOptions } from "firebase/app";

import { useSubscription, useFirebaseSetup } from "./hooks";
import { FeaturesContext, FirebaseContext } from "./contexts";
import type { FeatureContextValues } from "./contexts";

interface ProviderProps {
  children?: React.ReactNode;
}

interface FirebaseProviderProps extends ProviderProps {
  options?: FirebaseOptions;
}

interface FeaturesProviderProps extends ProviderProps {
  initialValue?: FeatureContextValues;
}

export const FirebaseProvider = ({
  options,
  children,
}: FirebaseProviderProps) => {
  const { app, database } = useFirebaseSetup(options ?? {});

  return (
    <FirebaseContext.Provider value={{ app, database }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const FeaturesProvider = ({
  children,
  initialValue = {
    isAutoAuthenticationEnabled: false,
    isGreetingsEnabled: false,
  },
}: FeaturesProviderProps) => {
  const features = useSubscription<FeatureContextValues>({
    path: "features",
    initialValue,
  });

  return (
    <FeaturesContext.Provider value={features}>
      {children}
    </FeaturesContext.Provider>
  );
};
