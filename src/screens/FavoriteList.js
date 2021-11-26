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
import { useIsFocused } from '@react-navigation/native';

const FavoriteList = () => {
    const isFocused = useIsFocused();
  const {favoriteList, getDirections, updateUserLogStatus, userData} = useContext(AppContext);
  const [myList, setMyList] = useState(favoriteList);
  const [isUserLogIn,setIsUserLogIn] = useState(userData.isLogged);
  const [modalVisible, setModalVisible] = useState(false);
  console.log('modalVisible',modalVisible);
  console.log('isUserLogIn',isUserLogIn);
  const params = {
    bg: {
      style: styles.bg,
    },
    modal: {
        modalVisible: modalVisible,
      },
    render:(arr)=>({
        articles:arr,
        ListHeaderComponent:<TextComp style={styles.header}>My Favorites:</TextComp>
    }),
  };

  const colseModal = () => {
    setModalVisible(false);
  };

 

  const renderArticles = (arr = []) => {
      console.log('arr',arr);
    if (arr?.length > 0)
      return (
        <RenderArticles {...params.render(arr)}/>
      );
    else {
      console.log('herrre');
      return <TextComp style={styles.empty}>{strings.favoritesEmpty}</TextComp>;
    }
  };
  useEffect(() => {
    setMyList(favoriteList);
  }, [favoriteList]);

  useEffect(() => {
      !isUserLogIn && isFocused && setModalVisible(true)
  }, [isFocused]);
  return <BG {...params.bg}>
      {/* <AppModal {...params.modal}>
        <Text style={styles.modalHeader}>
          {strings.modal_header}
        </Text>
        <GoogleSignIn afterUserIsLogged={afterUserIsLogged} />
        <Button title={strings.cancel} onPress={colseModal} />
      </AppModal> */}
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
