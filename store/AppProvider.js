import React, { useState} from 'react';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';
import {findDirectionToLanguage} from '../src/utils/functionUtils'

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] // "fr_FR"
    : NativeModules.I18nManager.localeIdentifier;

    const initUser = {
      language:locale,
      token:undefined,
      userName:undefined
    }


export const AppProvider = props => {
  const [userData,setUserData]= useState(initUser);
  const [favoriteList, setFavoriteList] = useState([]);

  const addActicleToFavorites = article => {
    setFavoriteList({...favoriteList, article});
  };

  
  return (
    <AppContext.Provider
      value={{
        userData:userData,
        getDirections:findDirectionToLanguage(userData.language),
        isRTL:locale === 'he' || locale === 'he-IL',
        favoriteList: favoriteList,
        addActicleToFavorites: addActicleToFavorites,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
