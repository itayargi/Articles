import React, {createContext, useState} from 'react';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DataStorage = createContext();

export const AppProvider = props => {
  const [favoriteList, setFavoriteList] = useState([]);

  const addActicleToFavorites = article => {
    setFavoriteList({...favoriteList, article});
  };
  return (
    <DataStorage.Provider
      value={{
        favoriteList: favoriteList,
        addActicleToFavorites: addActicleToFavorites,
      }}>
      {props.children}
    </DataStorage.Provider>
  );
};
