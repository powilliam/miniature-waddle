import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text } from "react-native";
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
    url: "users",
  });
  const { data: products } = useNetworkingServiceCall({
    url: "products",
  });

  // Shouldn't be called. Missing Configuration. Check console for warning
  const { data: posts } = useNetworkingServiceCall({
    url: "posts",
  });

  return (
    <ScrollView style={styles.container}>
      <Text>{`${JSON.stringify({ features, users, products, posts })}`}</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const networking = {
  endpoints: {
    "https://jsonplaceholder.typicode.com": ["users"],
    "https://dummyjson.com": ["products"],
  },
  interceptors: {
    "https://jsonplaceholder.typicode.com": {
      headers: { "x-client-endpoint": "users" },
    },
    "https://dummyjson.com": {
      headers: { "x-client-endpoint": "products" },
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
