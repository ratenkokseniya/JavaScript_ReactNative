import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function EpisodesScreen() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setPage(1);
    setEpisodes([]);
    fetchEpisodes(1, search);
  }, [search]);

  const fetchEpisodes = async (pageNum = 1, name = "") => {
    pageNum === 1 ? setLoading(true) : setIsLoadingMore(true);
    try {
      const url = `https://rickandmortyapi.com/api/episode?page=${pageNum}&name=${name}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        if (pageNum === 1) {
          setEpisodes([]);
          setError("Эпизоды не найдены");
        }
        setHasNextPage(false);
      } else {
        setEpisodes((prev) => (pageNum === 1 ? data.results : [...prev, ...data.results]));
        setHasNextPage(Boolean(data.info?.next));
      }
    } catch (err) {
      setError("Ошибка загрузки эпизодов");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && hasNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchEpisodes(nextPage, search);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/episodes/${item.id}`)}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text>Episode: {item.episode}</Text>
      <Text>Air Date: {item.air_date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.search}
        placeholder="Поиск по названию эпизода..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={episodes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore && (
              <ActivityIndicator size="small" color="#ff9966" style={{ marginVertical: 10 }} />
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    margin: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#fff0e6",
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
