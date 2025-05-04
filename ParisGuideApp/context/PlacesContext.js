import React, { createContext, useContext } from 'react';
import luxembourgImage from '../assets/luxembourg.jpg';
import monceauImage from '../assets/monceau.jpg';
import louvreImage from '../assets/louvre.jpg';
import orsayImage from '../assets/orsay.jpg';
import floreImage from '../assets/flore.jpg';
import deuxmagotsImage from '../assets/deuxmagots.jpg';

const PlacesContext = createContext();

const placesData = {
  parks: [
    { id: '1', name: 'Парк Люксембург', description: 'Красивый исторический парк.', rating: 4.7, image: luxembourgImage },
    { id: '2', name: 'Парк Монсо', description: 'Тихий и уютный парк.', rating: 4.5, image: monceauImage },
  ],
  museums: [
    { id: '3', name: 'Лувр', description: 'Величайший музей мира.', rating: 5.0, image: louvreImage },
    { id: '4', name: 'Музей Орсе', description: 'Шедевры импрессионизма.', rating: 4.8, image: orsayImage },
  ],
  cafes: [
    { id: '5', name: 'Кафе де Флор', description: 'Легендарное кафе в центре.', rating: 4.6, image: floreImage },
    { id: '6', name: 'Ле Дё Маго', description: 'Историческое место для творческих людей.', rating: 4.5, image: deuxmagotsImage },
  ],
};

export const PlacesProvider = ({ children }) => {
  return (
    <PlacesContext.Provider value={placesData}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlaces = () => useContext(PlacesContext);