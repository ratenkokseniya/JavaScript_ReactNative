import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDB } from '../database/database';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function AddMovieScreen() {
  const db = getDB();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const result = await db.getAllAsync(`SELECT * FROM genres`);
      setGenres(result);
      if (result.length > 0) setSelectedGenre(result[0].id);
    } catch (err) {
      console.log('❌ Ошибка загрузки жанров:', err);
    }
  };

  const handleAdd = async () => {
    if (!title || !year || !director || !selectedGenre) {
      Alert.alert('Ошибка', 'Заполни все обязательные поля');
      return;
    }

    try {
      await db.runAsync(
        `INSERT INTO movies (title, description, year, director, genre_id) VALUES (?, ?, ?, ?, ?)`,
        [title.trim(), description.trim(), parseInt(year), director.trim(), selectedGenre]
      );
      Alert.alert('Успех', 'Фильм добавлен');
      navigation.goBack();
    } catch (err) {
      console.log('❌ Ошибка добавления фильма:', err);
      Alert.alert('Ошибка', 'Не удалось добавить фильм');
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

      <Button title="Добавить фильм" onPress={handleAdd} />
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
