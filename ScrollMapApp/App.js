import React, { useState } from 'react';
import { SafeAreaView, FlatList, useColorScheme, View, Platform, StatusBar } from 'react-native';
import {
  Provider as PaperProvider,
  Card,
  Text,
  MD3DarkTheme,
  MD3LightTheme,
  Button,
} from 'react-native-paper';
import { facts } from './facts'; // не забудь facts.js

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  const [columns, setColumns] = useState(2);
  const toggleLayout = () => setColumns(columns === 1 ? 2 : 1);

  const isAndroid = Platform.OS === 'android';
  const topInset = isAndroid ? StatusBar.currentHeight || 24 : 0;

  const renderItem = ({ item }) => (
    <Card style={{ margin: 8, flex: 1 }}>
      <Card.Cover source={item.image} />
      <Card.Content>
        <Text variant="titleMedium" style={{ marginTop: 8 }}>{item.title}</Text>
        <Text variant="bodySmall" style={{ marginBottom: 4 }}>{item.date}</Text>
        <Text variant="bodyMedium">{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, paddingTop: topInset }}>
        <View style={{ padding: 8 }}>
          <Button mode="outlined" onPress={toggleLayout}>
            {columns === 1 ? '🗃️ Показать сеткой' : '📋 Показать списком'}
          </Button>
        </View>
        <FlatList
          data={facts}
          renderItem={renderItem}
          key={columns}
          keyExtractor={item => item.id}
          numColumns={columns}
          contentContainerStyle={{ padding: 8 }}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}
