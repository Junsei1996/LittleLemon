import { ActivityIndicator, Text, View } from "react-native";
import Onboarding from "./onboarding";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const navigateToOnboarding = () => {
    router.navigate("./onboarding");
  };

  const navigateToHome = () => {
    router.navigate("./menu");
  };

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("@hasOnboarded");
        if (value === "true") {
          navigateToHome();
        } else {
          navigateToOnboarding();
        }
      } catch (e) {
        console.log("Failed to load onboarding state");
      }
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
