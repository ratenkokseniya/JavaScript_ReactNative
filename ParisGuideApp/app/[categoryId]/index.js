import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { usePlaces } from '../../context/PlacesContext';
import BackButton from '../../components/BackButton';

export default function CategoryScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();
  const placesData = usePlaces();

  if (!placesData || !placesData[categoryId]) {
    return (
      <View style={styles.centered}><Text>Нет данных для категории.</Text></View>
    );
  }

  const places = placesData[categoryId];

  const handlePlacePress = (place) => {
    router.push(`/${categoryId}/${place.id}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={`full-${i}`} name="star" size={18} color="#FFD700" />);
    }
    if (halfStar) {
      stars.push(<FontAwesome key="half" name="star-half-full" size={18} color="#FFD700" />);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.header}>{getCategoryTitle(categoryId)}</Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePlacePress(item)}>
            {item.image && <Image source={item.image} style={styles.image} />}
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.stars}>{renderStars(item.rating)}</View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const getCategoryTitle = (id) => {
  switch (id) {
    case 'parks': return 'Парки Парижа';
    case 'museums': return 'Музеи Парижа';
    case 'cafes': return 'Кафе Парижа';
    default: return 'Места';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECECEC', padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECECEC' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  card: { backgroundColor: '#4A4A4A', borderRadius: 12, marginBottom: 20, flexDirection: 'row', overflow: 'hidden' },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  stars: { flexDirection: 'row' },
});