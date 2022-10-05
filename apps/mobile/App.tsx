import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import {
  FirebaseProvider,
  FeaturesProvider,
} from "@packages/firebase/providers";
import { useFeatures } from "@packages/firebase/hooks";
import { NetworkingProvider } from "@packages/networking/providers";
import { useNetworkingServiceCall } from "@packages/networking/hooks";

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

  const { data: users } = useNetworkingServiceCall({
    path: "users",
  });

  return (
    <View style={styles.container}>
      <Text>{`${JSON.stringify({ features, users })}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const networking = {
  endpoints: {
    "https://jsonplaceholder.typicode.com": ["users"],
  },
  interceptors: {
    "*": {
      headers: { "x-client-hello": "world" },
    },
    "https://jsonplaceholder.typicode.com": {
      headers: { "x-client-endpoint": "users" },
    },
  },
};

export default () => (
  <NetworkingProvider {...networking}>
    <FirebaseProvider>
      <FeaturesProvider>
        <App />
      </FeaturesProvider>
    </FirebaseProvider>
  </NetworkingProvider>
);
