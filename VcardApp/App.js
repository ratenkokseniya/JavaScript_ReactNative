import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }} 
        style={styles.image} 
      />
      <Text style={styles.name}>Ратенко Ксения</Text>
      <Text style={styles.group}>CS-206(c)</Text>
      <View style={styles.infoWrapper}>
        <View style={styles.infoContainer}>
          <MaterialIcons name="email" size={24} color="black" style={styles.icon} />
          <Text style={styles.info}>example@email.com</Text>
        </View>
        <View style={styles.infoContainer}>
          <MaterialIcons name="favorite" size={24} color="black" style={styles.icon} />
          <Text style={styles.info}>Книги</Text>
        </View>
      </View>
      <Text style={[styles.info, styles.quote]}>
        "Cōgitō ergō sum"
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  group: {
    fontSize: 18,
    color: "gray",
    marginBottom: 15,
  },
  infoWrapper: {
    alignItems: "center",
    width: "80%",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "80%",
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  info: {
    fontSize: 16,
    flexShrink: 1,
  },
  quote: {
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    marginTop: 15,
  },
});
