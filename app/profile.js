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
  const [orderStatusChecked, setOrderStatusChecked] = useState(false);
  const [passwordChangesChecked, setPasswordChangesChecked] = useState(false);
  const [specialOffersChecked, setSpecialOffersChecked] = useState(false);
  const [newsletterChecked, setNewsletterChecked] = useState(false);

  const handleBackNav = () => {};

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
        <ScrollView contentContainerStyle={{
          paddingBottom:30
        }}>
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
              <TextInput style={styles.textInput} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.textTitle}>Last Name</Text>
              <TextInput style={styles.textInput} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.textTitle}>Email</Text>
              <TextInput style={styles.textInput} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.textTitle}>Phone Number</Text>
              <TextInput style={styles.textInput} />
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
              <TouchableOpacity style={styles.yellowButton}>
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
                style={[
                  styles.transparentButton,
                  {
                    padding: 5,
                  },
                ]}
              >
                <Text style={styles.transparentButtonText}>Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.filledButton}>
                <Text style={styles.yellowButtonText}>Logout</Text>
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
