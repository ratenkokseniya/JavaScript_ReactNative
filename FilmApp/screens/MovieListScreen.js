import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  Alert, TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDB } from '../database/database';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function MovieListScreen() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState('title_asc');

  const db = getDB();
  const navigation = useNavigation();

  const fetchMovies = async () => {
    try {
      const result = await db.getAllAsync(`
        SELECT m.*, g.name AS genre
        FROM movies m
        LEFT JOIN genres g ON m.genre_id = g.id
      `);
      setMovies(result);
      filterMovies(result, searchQuery, selectedGenre, sortBy);
    } catch (error) {
      console.log('❌ Ошибка при получении фильмов:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const result = await db.getAllAsync(`SELECT * FROM genres ORDER BY name`);
      setGenres(result);
    } catch (error) {
      console.log('❌ Ошибка при загрузке жанров:', error);
    }
  };

  const filterMovies = (allMovies, query, genreId, sortOption) => {
    let filtered = allMovies;

    if (query) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (genreId) {
      filtered = filtered.filter(movie => movie.genre_id === genreId);
    }

    switch (sortOption) {
      case 'title_asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'year_desc':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year_asc':
        filtered.sort((a, b) => a.year - b.year);
        break;
    }

    setFilteredMovies(filtered);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 15, marginRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Добавить фильм')}>
              <Text style={styles.headerBtn}>➕</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Жанры')}>
              <Text style={styles.headerBtn}>📚</Text>
            </TouchableOpacity>
          </View>
        )
      });

      fetchMovies();
    }, [searchQuery, selectedGenre, sortBy])
  );

  const handleDelete = (id) => {
    Alert.alert('Удалить фильм?', 'Это действие нельзя отменить.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await db.runAsync(`DELETE FROM movies WHERE id = ?`, [id]);
            fetchMovies();
          } catch (err) {
            console.log('❌ Ошибка удаления:', err);
          }
        }
      }
    ]);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterMovies(movies, text, selectedGenre, sortBy);
  };

  const handleGenreFilter = (genreId) => {
    const id = genreId || null;
    setSelectedGenre(id);
    filterMovies(movies, searchQuery, id, sortBy);
  };

  const handleSort = (value) => {
    setSortBy(value);
    filterMovies(movies, searchQuery, selectedGenre, value);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Редактировать фильм', { id: item.id })}
        style={styles.editButton}
      >
        <Text style={styles.editIcon}>✏️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title} ({item.year})</Text>
        <Text style={styles.subtitle}>{item.genre || 'Без жанра'}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎬 Список фильмов</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Поиск по названию..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedGenre}
          onValueChange={handleGenreFilter}
          style={styles.picker}
        >
          <Picker.Item label="Все жанры" value={null} />
          {genres.map((genre) => (
            <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerWrapper}>
        <Picker selectedValue={sortBy} onValueChange={handleSort} style={styles.picker}>
          <Picker.Item label="Название: A → Я" value="title_asc" />
          <Picker.Item label="Название: Я → A" value="title_desc" />
          <Picker.Item label="Год: новые → старые" value="year_desc" />
          <Picker.Item label="Год: старые → новые" value="year_asc" />
        </Picker>
      </View>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Фильмы не найдены</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10
  },
  picker: {
    height: 50,
    width: '100%'
  },
  item: {
    position: 'relative',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 5 },
  description: { fontSize: 14, color: '#333' },
  headerBtn: { fontSize: 22, color: 'blue' },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 35,
    zIndex: 10
  },
  editIcon: {
    fontSize: 18,
    color: 'blue'
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 10
  },
  deleteIcon: {
    fontSize: 18,
    color: 'red'
  }
});