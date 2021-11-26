import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppContext from '../../store/AppContext';
import BG from '../components/bg/BG';
import GoogleSignIn from '../components/google/GoogleSignIn';
import AppModal from '../components/modal/AppModal';
import TextComp from '../components/textComp/TextComp';
import Colors from '../utils/Colors';
import screenNames from '../utils/screenNames';
import strings from '../utils/strings';

const HomeScreen = ({navigation}) => {
  const {getDirections, userData} = useContext(AppContext);

  const {userName} = userData
  console.log('userName',userName);

  const params = {
    bg: {
      style: [styles.contianer, {flexDirection: getDirections.flexDirection}],
      title: strings.homeScreen_header + " " + userName,
      signOut:true
    },
    favorite: {
      style: styles.btn,
      onPress:()=>onFavoriteBtnPress()
    },
    articles: {
      style: [styles.btn, {backgroundColor: Colors.popularColor}],
      onPress: () => navigation.navigate(screenNames.Categories),
    },

   
  };
 

  const onFavoriteBtnPress=()=>{
    navigation.navigate(screenNames.FavoriteList)
  }
  return (
    <BG {...params.bg}>
      <TouchableOpacity {...params.favorite}>
        <TextComp>{strings.homeScreen_favorite_btn}</TextComp>
      </TouchableOpacity>
      <TouchableOpacity {...params.articles}>
        <TextComp>{strings.homeScreen_articles_btn}</TextComp>
      </TouchableOpacity>
    </BG>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  btn: {
    width: '45%',
    height: 90,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderWidth: 1,
    backgroundColor: Colors.favoriteColor,
  },

});
