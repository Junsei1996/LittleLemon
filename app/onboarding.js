import { useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Onboarding() {
  const router = useRouter();
  const [name, setName] = useState("");

  const navigateToProfile = () => {
    router.navigate("./menu");
  };
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errorsObj = {};

    if (!firstName.trim()) {
      errorsObj.firstName = "First Name is required";
      valid = false;
    }

    if (!email.trim()) {
      errorsObj.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsObj.email = "Enter a valid email";
      valid = false;
    }

    setErrors(errorsObj);
    return valid;
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        await AsyncStorage.setItem("@hasOnboarded", "true");
        // After saving, you can force navigate or trigger a re-render
        // (OR better: manage navigation with something like react-navigation)
      } catch (e) {
        console.log("Failed to save onboarding state");
      }
    }
  };

  const handleNext = async () => {
    if (validate()) {
      // navigate to next screen or save data
      await handleSave();
      navigateToProfile();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo_s.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Let us get to know you</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
      </View>

      <View style={styles.footer}>
        <View
          style={{
            width: "50%",
          }}
        ></View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEE2E6", // light gray background
  },
  header: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    height: 60,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6c757d",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#F8F9FA",
    padding: 30,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "30%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default Onboarding;
