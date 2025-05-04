import { Stack } from 'expo-router';
import { PlacesProvider } from '../context/PlacesContext';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts(FontAwesome.font);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECECEC' }}>
        <ActivityIndicator size="large" color="#4A4A4A" />
      </View>
    );
  }

  return (
    <PlacesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PlacesProvider>
  );
}
