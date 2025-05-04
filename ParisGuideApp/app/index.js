import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const categories = [
    { id: 'parks', title: 'Парки', icon: 'tree' },
    { id: 'museums', title: 'Музеи', icon: 'university' },
    { id: 'cafes', title: 'Кафе', icon: 'coffee' },
  ];

  const handleCategoryPress = (categoryId) => {
    router.push(`/${categoryId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите категорию</Text>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.button} onPress={() => handleCategoryPress(category.id)}>
          <FontAwesome5 name={category.icon} size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4A4A4A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});