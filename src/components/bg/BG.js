import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import TextComp from '../textComp/TextComp';

const BG = props => {
  const {source, style, title} = props;
  const params = {
    background: {
      source: source,
      style: styles.background,
    },
  };
  return (
    <ImageBackground {...params.background}>
        {title && <TextComp style={styles.title}>{title}</TextComp>}
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
    fontSize:24,
    paddingTop:20
    // marginTop:20
  },
});
