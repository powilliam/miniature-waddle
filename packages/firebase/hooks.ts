import { getApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import { useEffect, useState, useContext, useRef } from "react";

import { FeaturesContext, FirebaseContext } from "./contexts";
import type { FirebaseContextValues } from "./contexts";

interface SubscriptionConfig<T> {
  path: string;
  initialValue: T;
}

export const useFirebaseApplicationInterfaces = () => {
  const app = useRef<FirebaseContextValues["app"]>(getApp());
  const database = useRef<FirebaseContextValues["database"]>(
    getDatabase(app.current)
  );

  return { app: app.current, database: database.current };
};

export const useSubscription = <T>({
  path,
  initialValue,
}: SubscriptionConfig<T>) => {
  const { database } = useFirebase();

  const [snapshot, setSnapshot] = useState<T>(initialValue);

  useEffect(() => {
    const reference = ref(database, path);
    const unsubscrible = onValue(reference, (snapshot) =>
      setSnapshot(snapshot.val())
    );
    return () => unsubscrible();
  }, [database]);

  return snapshot;
};

export const useFeatures = () => useContext(FeaturesContext);

export const useFirebase = () => useContext(FirebaseContext);
