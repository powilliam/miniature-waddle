import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import {
  FirebaseProvider,
  FeaturesProvider,
} from "@packages/firebase/providers";
import { useFeatures } from "@packages/firebase/hooks";

import { firebaseOptions } from "./configs";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});

function App() {
  const features = useFeatures();

  return (
    <View style={styles.container}>
      <Text>{`${JSON.stringify(features)}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default () => (
  <FirebaseProvider options={firebaseOptions}>
    <FeaturesProvider>
      <App />
    </FeaturesProvider>
  </FirebaseProvider>
);
