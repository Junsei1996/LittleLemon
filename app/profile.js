import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, StyleSheet } from "react-native";

function Profile() {
  const router = useRouter();
  const [orderStatusChecked, setOrderStatusChecked] = useState(false);
  const [passwordChangesChecked, setPasswordChangesChecked] = useState(false);
  const [specialOffersChecked, setSpecialOffersChecked] = useState(false);
  const [newsletterChecked, setNewsletterChecked] = useState(false);

  const FIRST_NAME_KEY = "FIRST_NAME";
  const LAST_NAME_KEY = "LAST_NAME";
  const EMAIL_KEY = "EMAIL";
  const PHONE_KEY = "PHONE";

  const orderStatusCheckedKey = "orderStatusCheckedKey";
  const passwordChangesCheckedKey = "passwordChangesCheckedKey";
  const specialOffersCheckedKey = "specialOffersCheckedKey";
  const newsletterCheckedKey = "newsletterChecked";

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const loadUserData = async () => {
    try {
      const storedorderStatusChecked = await AsyncStorage.getItem(
        orderStatusCheckedKey
      );
      const storedpasswordChangesCheckedKey = await AsyncStorage.getItem(
        passwordChangesCheckedKey
      );
      const storedspecialOffersCheckedKey = await AsyncStorage.getItem(
        specialOffersCheckedKey
      );
      const storednewsletterCheckedKey = await AsyncStorage.getItem(
        newsletterCheckedKey
      );

      const storedFirstName = await AsyncStorage.getItem(FIRST_NAME_KEY);
      const storedEmail = await AsyncStorage.getItem(EMAIL_KEY);
      const storedLastName = await AsyncStorage.getItem(LAST_NAME_KEY);
      const storedPhone = await AsyncStorage.getItem(PHONE_KEY);

      if (storedFirstName) setFirstName(storedFirstName);
      if (storedEmail) setEmail(storedEmail);
      if (storedLastName) setLastName(storedLastName);
      if (storedPhone) setLastName(storedPhone);

      if (storedorderStatusChecked)
        setOrderStatusChecked(storedorderStatusChecked);
      if (storedpasswordChangesCheckedKey)
        setPasswordChangesChecked(storedpasswordChangesCheckedKey);
      if (storedspecialOffersCheckedKey)
        setSpecialOffersChecked(storedspecialOffersCheckedKey);
      if (storednewsletterCheckedKey)
        setNewsletterChecked(storednewsletterCheckedKey);
    } catch (error) {
      console.log("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async () => {
    if (validate) {
      try {
        await AsyncStorage.setItem(FIRST_NAME_KEY, firstName);
        await AsyncStorage.setItem(EMAIL_KEY, email);
        await AsyncStorage.setItem(LAST_NAME_KEY, lastName);
        await AsyncStorage.setItem(PHONE_KEY, phone);

        await AsyncStorage.setItem(
          passwordChangesCheckedKey,
          JSON.stringify(passwordChangesChecked)
        );
        await AsyncStorage.setItem(
          specialOffersCheckedKey,
          JSON.stringify(specialOffersChecked)
        );
        await AsyncStorage.setItem(newsletterCheckedKey, JSON.stringify(newsletterChecked));
        await AsyncStorage.setItem(orderStatusCheckedKey, JSON.stringify(orderStatusChecked));
      } catch (error) {
        console.log("Error saving user data:", error);
      }
    }
  };

  const deleteUserData = async () => {
    try {
      await AsyncStorage.removeItem(FIRST_NAME_KEY);
      await AsyncStorage.removeItem(EMAIL_KEY);
      await AsyncStorage.removeItem(LAST_NAME_KEY);
      await AsyncStorage.removeItem(PHONE_KEY);

      await AsyncStorage.removeItem(newsletterCheckedKey);
      await AsyncStorage.removeItem(orderStatusCheckedKey);
      await AsyncStorage.removeItem(passwordChangesCheckedKey);
      await AsyncStorage.removeItem(specialOffersCheckedKey);
      await AsyncStorage.removeItem("@hasOnboarded");

      setFirstName("");
      setEmail("");
      setLastName("");
      setPhone("");

      setNewsletterChecked(false);
      setOrderStatusChecked(false);
      setPasswordChangesChecked(false);
      setSpecialOffersChecked(false);

      router.replace("./onboarding");
    } catch (error) {
      console.log("Error deleting user data:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const validate = () => {
    let valid = true;
    let errorsObj = {};

    if (!firstName.trim()) {
      valid = false;
    }
    if (!lastName.trim()) {
      valid = false;
    }

    if (!email.trim()) {
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
    }

    setErrors(errorsObj);
    return valid;
  };

  const handleBackNav = () => {
    router.back()
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.backImageContainer}>
          <TouchableOpacity
            style={styles.backImageBackground}
            onPress={handleBackNav}
          >
            <Image
              style={styles.backImage}
              source={require("../assets/images/logo_s.jpg")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/logo_s.jpg")}
          />
        </View>
        <View style={styles.headerProfileContainer}>
          <TouchableOpacity
            style={styles.backImageBackground}
            onPress={handleBackNav}
          >
            <Image
              style={styles.headerProfileImage}
              source={require("../assets/images/logo_s.jpg")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: "90%",
          width: "100%",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        >
          <View>
            <Text style={[styles.titleStyle, { marginHorizontal: 20 }]}>
              Personal Information
            </Text>

            <Text
              style={{
                marginHorizontal: 20,
              }}
            >
              Avatar
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View>
                <TouchableOpacity
                  style={styles.profileImageBackground}
                  onPress={handleBackNav}
                >
                  <Image
                    style={styles.profileImage}
                    source={require("../assets/images/logo_s.jpg")}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.filledButton, { marginHorizontal: 8 }]}
              >
                <Text>Change</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.transparentButton, { marginHorizontal: 8 }]}
              >
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.textTitle}>First Name</Text>
              <TextInput
                style={styles.textInput}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.textTitle}>Last Name</Text>
              <TextInput
                style={styles.textInput}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.textTitle}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.textTitle}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <Text style={styles.titleStyle}>Email Notifications</Text>

            <Pressable
              onPress={() => setOrderStatusChecked(!orderStatusChecked)}
              style={styles.checkboxContainer}
            >
              <View
                style={[
                  styles.checkbox,
                  orderStatusChecked && styles.checkedBox,
                ]}
              />
              <Text style={styles.label}>Order Statuses</Text>
            </Pressable>

            <Pressable
              onPress={() => setPasswordChangesChecked(!passwordChangesChecked)}
              style={styles.checkboxContainer}
            >
              <View
                style={[
                  styles.checkbox,
                  passwordChangesChecked && styles.checkedBox,
                ]}
              />
              <Text style={styles.label}>Password Changes</Text>
            </Pressable>

            <Pressable
              onPress={() => setSpecialOffersChecked(!specialOffersChecked)}
              style={styles.checkboxContainer}
            >
              <View
                style={[
                  styles.checkbox,
                  specialOffersChecked && styles.checkedBox,
                ]}
              />
              <Text style={styles.label}>Special Offers</Text>
            </Pressable>

            <Pressable
              onPress={() => setNewsletterChecked(!newsletterChecked)}
              style={styles.checkboxContainer}
            >
              <View
                style={[
                  styles.checkbox,
                  newsletterChecked && styles.checkedBox,
                ]}
              />
              <Text style={styles.label}>Newsletter</Text>
            </Pressable>
          </View>

          <View>
            <View>
              <TouchableOpacity
                style={styles.yellowButton}
                onPress={() => {
                  deleteUserData();
                }}
              >
                <Text style={styles.yellowButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  loadUserData();
                }}
                style={[
                  styles.transparentButton,
                  {
                    padding: 5,
                  },
                ]}
              >
                <Text style={styles.transparentButtonText}>Discard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filledButton}
                onPress={() => {
                  saveUserData();
                }}
              >
                <Text style={styles.yellowButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    height: "10%",
    backgroundColor: "#010101",
    alignItems: "center",
  },
  backImageContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  backImageBackground: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#123321",
    justifyContent: "center",
    alignItems: "center",
  },
  backImage: {
    height: 40,
    width: 40,
  },
  profileImageBackground: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "#123321",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    height: 80,
    width: 80,
  },

  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 80,
    width: 180,
    resizeMode: "contain",
  },
  headerProfileContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerProfileImage: {
    height: 40,
    width: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    backgroundColor: "#4CAF50",
  },
  label: {
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  textTitle: {
    fontSize: 12,
    marginVertical: 5,
  },
  textInput: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  transparentButton: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  transparentButtonText: {
    fontSize: 12,
  },
  yellowButton: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  yellowButtonText: {
    fontSize: 12,
  },
  filledButton: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#495e57",
  },
});

export default Profile;
