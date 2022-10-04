import { createContext } from "react";

export interface Features {
  isAutoAuthenticationEnabled: boolean;
  isGreetingsEnabled: boolean;
}

export const FeaturesContext = createContext<Features>({
  isAutoAuthenticationEnabled: false,
  isGreetingsEnabled: false,
});
