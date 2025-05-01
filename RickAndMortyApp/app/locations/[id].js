import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function LocationDetails() {
  const { id } = useLocalSearchParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        const data = await response.json();
        setLocation(data);
      } catch (err) {
        setError("Ошибка загрузки локации");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !location) {
    return (
      <View style={styles.centered}>
        <Text>{error || "Локация не найдена"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{location.name}</Text>
      <Text>Type: {location.type}</Text>
      <Text>Dimension: {location.dimension}</Text>
      <Text>Residents: {location.residents.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
