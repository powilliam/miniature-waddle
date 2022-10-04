import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const app = !getApps().length
  ? initializeApp({
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
    })
  : getApp();

export const database = getDatabase(app);
