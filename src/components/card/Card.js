import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';
import sizes from '../../utils/sizes';
import strings from '../../utils/strings';

const Card = props => {
  const {article , onPress} = props;
  const backUpImage =
    'https://cdn.pixabay.com/photo/2014/03/24/17/21/newspaper-295480__340.png';
  const onLinkPress = data => {
    onPress(data)
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => onLinkPress(article)}>
      <ImageBackground
        resizeMode={'contain'}
        source={{uri: article.image || backUpImage}}
        style={styles.background}></ImageBackground>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
      <Text style={styles.text} >{strings.card_go_to_article}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: sizes.PageWidth * 0.8,
    paddingVertical:20,
    backgroundColor: '#ffffff',
    margin: 10,
    alignItems: 'center',
    elevation:10,
    borderRadius:10
  },
  background: {
    height: 100,
    width: 120,
  },
  title:{
      paddingHorizontal:20,
      textAlign:"center",
      fontSize:15,
      marginVertical:5,
      fontWeight:"bold",
      color:"black"
  },
  text:{
    color:"black"

  },
});
