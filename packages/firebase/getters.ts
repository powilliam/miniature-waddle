import Constants from "./constants";
import { valueFor } from "./utils";

import type { FeatureContextValues } from "./contexts";

export const features = () =>
  valueFor<FeatureContextValues>(Constants.Features);
