import { getApp } from "firebase/app";
import { ref, get, getDatabase } from "firebase/database";
import type { DatabaseReference, DataSnapshot } from "firebase/database";

import Constants from "./constants";
import type { FeatureContextValues } from "./contexts";

const referenceFor = <T>(
  path: string,
  block: (reference: DatabaseReference) => T
) => {
  const app = getApp();
  const database = getDatabase(app);
  const reference = ref(database, path);

  return block(reference);
};

const mapSnapshotToValue =
  <T>() =>
  (snapshot: DataSnapshot) =>
    snapshot.val() as T;

const valueFor = <T>(path: string) =>
  referenceFor(path, (ref) => get(ref).then(mapSnapshotToValue<T>()));

export const features = () =>
  valueFor<FeatureContextValues>(Constants.Features);
