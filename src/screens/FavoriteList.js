import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, FlatList, Button, Alert} from 'react-native';
import AppContext from '../../store/AppContext';
import BG from '../components/bg/BG';
import Card from '../components/card/Card';
import GoogleSignIn from '../components/google/GoogleSignIn';
import AppModal from '../components/modal/AppModal';
import RenderArticles from '../components/renderArticles/RenderArticles';
import TextComp from '../components/textComp/TextComp';
import Colors from '../utils/Colors';
import strings from '../utils/strings';

const FavoriteList = () => {
  const {favoriteList} = useContext(AppContext);
  const [myList, setMyList] = useState(favoriteList);
  const params = {
    bg: {
      style: styles.bg,
    },
    render:(arr)=>({
        articles:arr,
        ListHeaderComponent:<TextComp style={styles.header}>My Favorites:</TextComp>
    }),
  };

  const renderArticles = (arr = []) => {
    if (arr?.length > 0)
      return (
        <RenderArticles {...params.render(arr)}/>
      );
    else {
      return <TextComp style={styles.empty}>{strings.favoritesEmpty}</TextComp>;
    }
  };
  useEffect(() => {
    setMyList(favoriteList);
  }, [favoriteList]);

  return <BG {...params.bg}>
      {renderArticles(myList)}
      </BG>;
};

export default FavoriteList;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  header:{
      fontSize:26,
      color:Colors.headerColor,
      textDecorationLine:"underline",
      marginBottom:10
  },
 
  empty:{textAlign: 'center', 
  color:"black",
  textAlign:"center",
  fontSize:20,
  paddingHorizontal:20,
  marginTop:20
},
});
