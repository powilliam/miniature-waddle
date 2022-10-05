import Constants from "expo-constants";

export const firebaseOptions = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
};
