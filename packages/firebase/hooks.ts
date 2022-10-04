import { useEffect, useState, useContext } from "react";
import { ref, onValue } from "firebase/database";

import { database } from "./index";
import { FeaturesContext } from "./contexts";

interface SubscriptionConfig<T> {
  path: string;
  initialValue: T;
}

export const useSubscription = <T>({
  path,
  initialValue,
}: SubscriptionConfig<T>) => {
  const [snapshot, setSnapshot] = useState<T>(initialValue);

  useEffect(() => {
    const reference = ref(database, path);
    const unsubscrible = onValue(reference, (snapshot) =>
      setSnapshot(snapshot.val())
    );
    return () => unsubscrible();
  }, []);

  return snapshot;
};

export const useFeatures = () => useContext(FeaturesContext);
