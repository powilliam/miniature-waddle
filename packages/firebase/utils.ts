import { getApp } from "firebase/app";
import { ref, get, getDatabase } from "firebase/database";
import type { DatabaseReference, DataSnapshot } from "firebase/database";

const mapSnapshotToValue =
  <T>() =>
  (snapshot: DataSnapshot) =>
    snapshot.val() as T;

const mapReferenceToValue =
  <T>() =>
  (reference: DatabaseReference) =>
    get(reference).then(mapSnapshotToValue<T>());

export const referenceFor = <T>(
  path: string,
  block: (reference: DatabaseReference) => T
) => {
  const app = getApp();
  const database = getDatabase(app);
  const reference = ref(database, path);

  return block(reference);
};

export const valueFor = <T>(path: string) =>
  referenceFor(path, mapReferenceToValue<T>());
