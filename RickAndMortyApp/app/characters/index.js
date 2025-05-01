import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function CharactersScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPage(1);
    setCharacters([]);
    fetchCharacters(1, search);
  }, [search]);

  const fetchCharacters = async (pageNum = 1, name = "") => {
    if (pageNum === 1) setLoading(true);
    else setIsLoadingMore(true);

    try {
      const url = `https://rickandmortyapi.com/api/character?page=${pageNum}&name=${name}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        if (pageNum === 1) {
          setCharacters([]);
          setError("Персонажи не найдены");
        }
        setHasNextPage(false);
      } else {
        setCharacters((prev) => (pageNum === 1 ? data.results : [...prev, ...data.results]));
        setHasNextPage(Boolean(data.info?.next));
      }
    } catch (err) {
      setError("Ошибка загрузки персонажей");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && hasNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCharacters(nextPage, search);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/characters/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Species: {item.species}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.search}
        placeholder="Поиск по имени..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore && (
              <ActivityIndicator size="small" color="#00cc66" style={{ marginVertical: 10 }} />
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
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
