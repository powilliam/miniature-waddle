import { FirebaseOptions, getApp, initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import { useEffect, useState, useContext, useMemo } from "react";

import { FeaturesContext, FirebaseContext } from "./contexts";
import type { FirebaseContextValues } from "./contexts";

interface SubscriptionConfig<T> {
  path: string;
  initialValue: T;
}

export const useFirebaseSetup = (options: FirebaseOptions) => {
  const [app, setApp] = useState<FirebaseContextValues["app"]>();

  const database = useMemo<FirebaseContextValues["database"]>(
    () => (!!app ? getDatabase(app) : undefined),
    [app]
  );

  useEffect(() => {
    let appScopedVariable: FirebaseContextValues["app"];

    try {
      /**
       * Nunca chegará no bloco catch na web, pois o firebase é inicializado no server-side.
       * Sempre chegará no block catch no mobile, pois o firebase sempre deverá ser inicializado ao fechar a aplicação
       */
      appScopedVariable = getApp();
    } catch {
      appScopedVariable = initializeApp(options);
    }

    setApp(appScopedVariable);
  }, []);

  return { app, database };
};

export const useSubscription = <T>({
  path,
  initialValue,
}: SubscriptionConfig<T>) => {
  const { database } = useFirebase();

  const [snapshot, setSnapshot] = useState<T>(initialValue);

  useEffect(() => {
    if (!database) {
      return;
    }
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
