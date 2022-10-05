import { initializeApp, getApp, FirebaseOptions } from "firebase/app";

/**
 * SIMPLESMENTE NAO TEM COMO SHAREAR ENV DE AMBIENTE ENTRE PACOTE DURANTE RUNTIME
 */
export const initializeWithOptions = (firebaseOptions: FirebaseOptions) => {
  try {
    getApp();
  } catch {
    initializeApp(firebaseOptions);
  }
};
