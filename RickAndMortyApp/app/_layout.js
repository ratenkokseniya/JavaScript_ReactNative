import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="characters/index"
        options={{
          title: "Персонажи",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="locations/index"
        options={{
          title: "Локации",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="earth" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="episodes/index"
        options={{
          title: "Эпизоды",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" size={size} color={color} />
          ),
        }}
      />

      {/* скрытые маршруты */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="characters/[id]" options={{ href: null }} />
      <Tabs.Screen name="locations/[id]" options={{ href: null }} />
      <Tabs.Screen name="episodes/[id]" options={{ href: null }} />
    </Tabs>
  );
}
