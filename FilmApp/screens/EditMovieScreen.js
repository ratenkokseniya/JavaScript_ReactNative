import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDB } from '../database/database';
import { Picker } from '@react-native-picker/picker';

export default function EditMovieScreen({ route, navigation }) {
  const { id } = route.params;
  const db = getDB();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchMovie();
    fetchGenres();
  }, []);

  const fetchMovie = async () => {
    try {
      const result = await db.getAllAsync(`SELECT * FROM movies WHERE id = ?`, [id]);
      const movie = result[0];
      setTitle(movie.title);
      setDescription(movie.description || '');
      setYear(movie.year.toString());
      setDirector(movie.director);
      setSelectedGenre(movie.genre_id);
    } catch (err) {
      console.log('❌ Ошибка загрузки фильма:', err);
    }
  };

  const fetchGenres = async () => {
    try {
      const result = await db.getAllAsync(`SELECT * FROM genres`);
      setGenres(result);
    } catch (err) {
      console.log('❌ Ошибка загрузки жанров:', err);
    }
  };

  const handleUpdate = async () => {
    if (!title || !year || !director || !selectedGenre) {
      Alert.alert('Ошибка', 'Заполни все обязательные поля');
      return;
    }

    try {
      await db.runAsync(
        `UPDATE movies SET title = ?, description = ?, year = ?, director = ?, genre_id = ? WHERE id = ?`,
        [title.trim(), description.trim(), parseInt(year), director.trim(), selectedGenre, id]
      );
      Alert.alert('Успех', 'Фильм обновлён');
      navigation.goBack();
    } catch (err) {
      console.log('❌ Ошибка при обновлении:', err);
      Alert.alert('Ошибка', 'Не удалось обновить фильм');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Название *</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Описание</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Год *</Text>
      <TextInput style={styles.input} value={year} onChangeText={setYear} keyboardType="numeric" />

      <Text style={styles.label}>Режиссёр *</Text>
      <TextInput style={styles.input} value={director} onChangeText={setDirector} />

      <Text style={styles.label}>Жанр *</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedGenre}
          onValueChange={setSelectedGenre}
          style={styles.picker}
        >
          {genres.map((genre) => (
            <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
          ))}
        </Picker>
      </View>

      <Button title="Сохранить изменения" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10
  },
  textArea: {
    textAlignVertical: 'top',
    minHeight: 80
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden'
  },
  picker: {
    height: 50,
    width: '100%'
  }
});
