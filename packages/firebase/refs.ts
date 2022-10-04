import { ref } from "firebase/database";

import { database } from "./index";

export const featuresReference = ref(database, "features");
