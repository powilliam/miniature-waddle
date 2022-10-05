import { registerRootComponent } from "expo";
import { initializeWithOptions } from "@packages/firebase";
import Constants from "expo-constants";

import App from "./App";

initializeWithOptions(Constants.expoConfig?.extra?.firebaseOptions);
registerRootComponent(App);
