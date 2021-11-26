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
      isLogged:false,
      userName:"Guest"
    }


export const AppProvider = props => {
  const [userData,setUserData]= useState(initUser);
  const [favoriteList, setFavoriteList] = useState([]);

  const addActicleToFavorites = article => {
    console.log('adding article');
    setFavoriteList([...favoriteList, article]);
  };

  const isArticleInFavoriteList =(title)=>{
    let isInList = favoriteList.find((article)=> article.title === title)
    return isInList !== undefined
  }
  const removeArticleFromList = (title) =>{
    let newList = favoriteList.filter((article)=> article.title !== title)
    setFavoriteList(newList)
  }
const updateUserLogStatus=(user)=>{
  console.log('user name', user?.name);
  setUserData({...userData, isLogged:true, userName:user?.name})
}  
const signOutUser=()=>{
  setUserData({...userData, isLogged:false, userName:"Guest"})

}
const updateUserDetails = (val) => {
  let newUser = { ...userData, ...val };
  AsyncStorage.setItem("USER", JSON.stringify(newUser));
  setUserData(newUser);
};
  return (
    <AppContext.Provider
      value={{
        userData:userData,
        getDirections:findDirectionToLanguage(userData.language),
        isRTL:locale === 'he' || locale === 'he-IL',
        favoriteList: favoriteList,
        addActicleToFavorites: addActicleToFavorites,
        isArticleInFavoriteList:isArticleInFavoriteList,
        removeArticleFromList:removeArticleFromList,
        updateUserLogStatus:updateUserLogStatus,
        signOutUser:signOutUser,
        isLogged:userData.isLogged,
        updateUserDetails:updateUserDetails,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
