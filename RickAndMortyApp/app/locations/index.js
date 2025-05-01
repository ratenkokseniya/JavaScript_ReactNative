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

export default function LocationsScreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setPage(1);
    setLocations([]);
    fetchLocations(1, search);
  }, [search]);

  const fetchLocations = async (pageNum = 1, name = "") => {
    pageNum === 1 ? setLoading(true) : setIsLoadingMore(true);
    try {
      const url = `https://rickandmortyapi.com/api/location?page=${pageNum}&name=${name}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        if (pageNum === 1) {
          setLocations([]);
          setError("Локации не найдены");
        }
        setHasNextPage(false);
      } else {
        setLocations((prev) => (pageNum === 1 ? data.results : [...prev, ...data.results]));
        setHasNextPage(Boolean(data.info?.next));
      }
    } catch (err) {
      setError("Ошибка загрузки локаций");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && hasNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLocations(nextPage, search);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/locations/${item.id}`)}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Dimension: {item.dimension}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.search}
        placeholder="Поиск по названию локации..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={locations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore && (
              <ActivityIndicator size="small" color="#3399ff" style={{ marginVertical: 10 }} />
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
    backgroundColor: "#e6f7ff",
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
