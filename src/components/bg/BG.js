import React, { useContext } from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import AppContext from '../../../store/AppContext';
import SignOut from '../google/SignOut';
import TextComp from '../textComp/TextComp';

const BG = props => {
  const {isLogged} = useContext(AppContext)
  const {source, style, title, signOut} = props;
  const params = {
    background: {
      source: source,
      style: styles.background,
    },
  };
  return (
    <ImageBackground {...params.background}>
        {title && <TextComp style={styles.title}>{title}</TextComp>}
      {signOut && isLogged && <SignOut style={styles.signOut} disabled={!isLogged} />}
      <View style={style}>{props.children}</View>
    </ImageBackground>
  );
};

export default BG;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  title:{
    textAlign:"center",
    fontSize:30,
    paddingTop:20,
    color:"black"
  },
  signOut:{
    alignSelf:"flex-end", 
    margin:10
  },
});
