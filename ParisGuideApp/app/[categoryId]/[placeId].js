import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { usePlaces } from '../../context/PlacesContext';
import BackButton from '../../components/BackButton';

export default function PlaceScreen() {
  const { categoryId, placeId } = useLocalSearchParams();
  const placesData = usePlaces();

  const place = (placesData[categoryId] || []).find((p) => p.id === placeId);

  if (!place) {
    return (
      <View style={styles.centered}><Text>Место не найдено.</Text></View>
    );
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={`full-${i}`} name="star" size={20} color="#FFD700" />);
    }
    if (halfStar) {
      stars.push(<FontAwesome key="half" name="star-half-full" size={20} color="#FFD700" />);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.imageWrapper}>
        {place.image && <Image source={place.image} style={styles.image} />}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.description}>{place.description}</Text>
        <View style={styles.stars}>{renderStars(place.rating)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECECEC' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECECEC' },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 250 },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  name: { fontSize: 26, fontWeight: 'bold', marginVertical: 10, color: '#333', textAlign: 'center' },
  description: { fontSize: 18, marginBottom: 20, color: '#666', textAlign: 'center' },
  stars: { flexDirection: 'row', marginTop: 10 },
});
