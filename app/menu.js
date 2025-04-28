import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";

// Open or create database
const db = SQLite.openDatabaseSync("menu.db"); // just a filename

function Menu() {
  const router = useRouter();
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Create table if it doesn't exist
  const createTable = async () => {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS Menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price REAL,
            description TEXT,
            image TEXT,
            category TEXT
          );`
    );
  };

  // Insert data into SQLite
  const insertMenuIntoDB = async (menuData) => {
    for (const item of menuData) {
      await db.runAsync(
        `INSERT INTO Menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);`,
        [item.name, item.price, item.description, item.image, item.category]
      );
    }
  };

  // Fetch data from SQLite
  const fetchMenuFromDB = async () => {
    try {
      const rows = await db.getAllAsync("SELECT * FROM Menu;");
      if (rows.length > 0) {
        setMenu(rows);
        setFilteredMenu(rows);
        setCategories([...new Set(rows.map((item) => item.category))]);
      } else {
        fetchMenuFromAPI(); // <-- fetch and save if not found
      }
    } catch (error) {
      console.error("Error fetching menu from DB:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data from API
  const fetchMenuFromAPI = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      ); // Replace with your API URL
      console.log(`reponse = ${response}`);
      const data = await response.json();
      const menuData = data.menu;
      setMenu(menuData);
      setFilteredMenu(menuData);
      setCategories([...new Set(menuData.map((item) => item.category))]);
      insertMenuIntoDB(menuData);
    } catch (error) {
      console.error("Failed to fetch menu from API", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter menu whenever search or category changes
  useEffect(() => {
    filterMenu();
  }, [searchQuery, selectedCategory]);

  const filterMenu = () => {
    let filtered = [...menu];

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMenu(filtered);
  };

  useEffect(() => {
    createTable();
    fetchMenuFromDB();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        item === selectedCategory && styles.selectedCategory,
      ]}
      onPress={() =>
        setSelectedCategory(item === selectedCategory ? null : item)
      }
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View
        style={{
          width: 80,
          height: 80,
          margin: 10,
        }}
      >
        <Image
          source={{
            uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
          }} // Update base URL
          style={styles.menuImage}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}

      <View
        style={{
          flexDirection: "row",
          height: "10%",
          backgroundColor: "#FFF",
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
        }}
      >
        <View
          style={{
            height: 80,
            width: 150,
            resizeMode: "contain",
          }}
        >
          <Image
            style={{
              height: 80,
              width: 150,
              resizeMode: "contain",
            }}
            source={require("../assets/images/logo_s.jpg")}
          />
        </View>

        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 30,
            overflow: "hidden",
            position: "absolute",
            right: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("./profile");
            }}
          >
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
              }}
              source={require("../assets/images/server.jpg")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            backgroundColor: "#495e57",
            height: "40%",
          }}
        >
          <Text
            style={{
              color: "yellow",
              fontSize: 35,
              marginHorizontal: 20,
            }}
          >
            Little Lemon
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "50%",
                justifyContent: "space-evenly",
                height: "70%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginHorizontal: 20,
                }}
              >
                Chicago
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginHorizontal: 20,
                }}
              >
                we are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </Text>
            </View>

            <View
              style={{
                width: "50%",
                height: "70%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Image
                  style={{ height: 150, width: 150 }}
                  source={require("../assets/images/server.jpg")}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <TextInput
              style={styles.searchBar}
              placeholder="Search menu..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCategory}
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
          />
        </View>

        <View>
          <FlatList
            data={filteredMenu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderMenuItem}
            contentContainerStyle={styles.menuList}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 40,
  },
  categoriesList: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: "#ffa500",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  menuList: {
    paddingBottom: 50,
  },
  menuItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },
  menuImage: {
    width: 80,
    height: 80,
  },
  menuInfo: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between",
  },
  menuName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  menuDescription: {
    color: "#555",
    fontSize: 12,
  },
  menuPrice: {
    color: "#000",
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default Menu;
