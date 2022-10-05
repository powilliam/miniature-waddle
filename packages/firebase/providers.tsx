import React from "react";

import { useSubscription, useFirebaseApplicationInterfaces } from "./hooks";
import { FeaturesContext, FirebaseContext } from "./contexts";
import type { FeatureContextValues } from "./contexts";

interface ProviderProps {
  children?: React.ReactNode;
}

interface FirebaseProviderProps extends ProviderProps {}

interface FeaturesProviderProps extends ProviderProps {
  initialValue?: FeatureContextValues;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const { app, database } = useFirebaseApplicationInterfaces();

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
