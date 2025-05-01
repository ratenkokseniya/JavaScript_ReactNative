import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieListScreen from './screens/MovieListScreen';
import AddMovieScreen from './screens/AddMovieScreen';
import EditMovieScreen from './screens/EditMovieScreen';
import GenreScreen from './screens/GenreScreen';

import { initDatabase } from './database/database';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Фильмы" component={MovieListScreen} />
        <Stack.Screen name="Добавить фильм" component={AddMovieScreen} />
        <Stack.Screen name="Редактировать фильм" component={EditMovieScreen} />
        <Stack.Screen name="Жанры" component={GenreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
