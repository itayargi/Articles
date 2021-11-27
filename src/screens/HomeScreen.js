import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppContext from '../../store/AppContext';
import BG from '../components/bg/BG';
import DashboardBox from '../components/dashboard/DashboardBox';
import GoogleSignIn from '../components/google/GoogleSignIn';
import AppModal from '../components/modal/AppModal';
import TextComp from '../components/textComp/TextComp';
import Colors from '../utils/Colors';
import screenNames from '../utils/screenNames';
import strings from '../utils/strings';

const HomeScreen = ({navigation}) => {
  const {getDirections, userData, favoriteList, isLogged} = useContext(AppContext);
  const {userName} = userData;
  const sumOfFavorites = favoriteList?.length;
  const params = {
    bg: {
      style:styles.contianer,
      title: strings.homeScreen_header + ' ' + userName,
      signOut: true,
    },
    btnBox:{
     style:[styles.btnBox, {flexDirection: getDirections.flexDirection}]
    },
    favorite: {
      style: styles.btn,
      onPress: () => onFavoriteBtnPress(),
    },
    articles: {
      style: [styles.btn, {backgroundColor: Colors.popularColor}],
      onPress: () => onArticlesBtnPress(),
    },
  };
  const dashboardArr = [
    {
      title: strings.dashboard_favorite_title,
      data: sumOfFavorites,
    },
  ];
  const renderDashboardData = (arr = []) => {
    return arr?.map((boxData, index) => {
      return <DashboardBox key={index} boxData={boxData} style={{marginTop:50}} />;
    });
  };

  const onArticlesBtnPress = () => {
    navigation.navigate(screenNames.Categories);
  };
  const onFavoriteBtnPress = () => {
    navigation.navigate(screenNames.FavoriteList);
  };
  return (
    <BG {...params.bg}>
      <TextComp style={styles.header}>{strings.homeScreen_sub_header}</TextComp>
      {isLogged && renderDashboardData(dashboardArr)}
      <View {...params.btnBox}>
      <TouchableOpacity {...params.favorite}>
        <TextComp>{strings.homeScreen_favorite_btn}</TextComp>
      </TouchableOpacity>
      <TouchableOpacity {...params.articles}>
        <TextComp>{strings.homeScreen_articles_btn}</TextComp>
      </TouchableOpacity>
      </View>
    </BG>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingBottom: 40,
  },
  header:{
    color:Colors.headerColor,
    textAlign:"center",
    marginVertical:20,
    fontSize:22
  },
  btnBox:{
    flex:1,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
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
