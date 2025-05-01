import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function EpisodeDetails() {
  const { id } = useLocalSearchParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        const data = await response.json();
        setEpisode(data);
      } catch (err) {
        setError("Ошибка загрузки эпизода");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  if (error || !episode) {
    return (
      <View style={styles.centered}>
        <Text>{error || "Эпизод не найден"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{episode.name}</Text>
      <Text>Episode: {episode.episode}</Text>
      <Text>Air Date: {episode.air_date}</Text>
      <Text>Characters: {episode.characters.length}</Text>
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
