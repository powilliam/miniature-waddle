import { get } from "firebase/database";

import { featuresReference } from "./refs";

export const getFeatures = <T>() =>
  get(featuresReference).then((snapshot) => snapshot.val() as T);
