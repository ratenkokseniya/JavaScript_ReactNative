import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const artworks = [
  { title: 'Starry Night', artist: 'Vincent van Gogh', year: 1889, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
  { title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: 1503, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg' },
  { title: 'The Scream', artist: 'Edvard Munch', year: 1893, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/1200px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg' },
  { title: 'The Persistence of Memory', artist: 'Salvador Dalí', year: 1931, image: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg' },
  { title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: 1665, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1200px-1665_Girl_with_a_Pearl_Earring.jpg' },
  { title: 'The Creation of Adam', artist: 'Michelangelo', year: 1512, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1200px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg' },
  { title: 'The Night Watch', artist: 'Rembrandt', year: 1642, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1200px-The_Night_Watch_-_HD.jpg' },
  { title: 'The Kiss', artist: 'Gustav Klimt', year: 1907, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGQSZ1xhcn62hCL0vtkrbBBo6ugIhWCbH24g&s' },
  { title: 'Las Meninas', artist: 'Diego Velázquez', year: 1656, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/1200px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg' }
];

export default function App() {
  const [index, setIndex] = useState(0);

  const nextArtwork = () => {
    if (index < artworks.length - 1) setIndex(index + 1);
  };
  
  const prevArtwork = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: artworks[index].image }} style={styles.image} />
      <Text style={styles.title}>{artworks[index].title}</Text>
      <Text style={styles.artist}>{artworks[index].artist} ({artworks[index].year})</Text>
      <View style={styles.buttons}>
        <Button title="Previous" onPress={prevArtwork} disabled={index === 0} color="black" />
        <Button title="Next" onPress={nextArtwork} disabled={index === artworks.length - 1} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  image: { width: 300, height: 400, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  artist: { fontSize: 16, fontStyle: 'italic', marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 10 },
});
