import React from "react";

import { useSubscription } from "./hooks";
import { FeaturesContext, Features } from "./contexts";

interface FeaturesProviderProps {
  children?: React.ReactNode;
  initialValue?: Features;
}

export const FeaturesProvider = ({
  children,
  initialValue = {
    isAutoAuthenticationEnabled: false,
    isGreetingsEnabled: false,
  },
}: FeaturesProviderProps) => {
  const features = useSubscription<Features>({
    path: "features",
    initialValue,
  });

  return (
    <FeaturesContext.Provider value={features}>
      {children}
    </FeaturesContext.Provider>
  );
};
