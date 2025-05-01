import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button
} from 'react-native';
import { getDB } from '../database/database';
import { useFocusEffect } from '@react-navigation/native';

export default function GenreScreen() {
  const db = getDB();
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchGenres();
    }, [])
  );

  const fetchGenres = async () => {
    try {
      const result = await db.getAllAsync(`SELECT * FROM genres ORDER BY name`);
      setGenres(result);
    } catch (err) {
      console.log('❌ Ошибка при получении жанров', err);
    }
  };

  const addGenre = async () => {
    if (!newGenre.trim()) return;
    try {
      await db.runAsync(`INSERT INTO genres (name) VALUES (?)`, [newGenre.trim()]);
      setNewGenre('');
      fetchGenres();
    } catch (err) {
      console.log('❌ Ошибка добавления жанра', err);
    }
  };

  const deleteGenre = async (id) => {
    Alert.alert('Удалить жанр?', 'Это действие необратимо', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          await db.runAsync(`DELETE FROM genres WHERE id = ?`, [id]);
          fetchGenres();
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteGenre(item.id)}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Жанры</Text>

      <TextInput
        style={styles.input}
        value={newGenre}
        onChangeText={setNewGenre}
        placeholder="Введите название жанра"
      />
      <View style={{ marginBottom: 10 }}>
        <Button title="Добавить жанр" onPress={addGenre} />
      </View>

      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Нет жанров для отображения</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  delete: { fontSize: 18, color: 'red' }
});
