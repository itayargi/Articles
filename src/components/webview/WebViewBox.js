import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import strings from '../../utils/strings';
import BackBtn from '../backBtn/BackBtn';

const WebViewBox = props => {
  const navigation = useNavigation();
  const {url, style, onPress, isArticleOnList} = props;
  const btnTextByProp = isArticleOnList
    ? strings.removeFromFavorites
    : strings.addToFavorites;
  const [btnText, setBtnText] = useState(btnTextByProp);
  const btnStyle = isArticleOnList ? styles.red : styles.blue;
 
 

  useEffect(() => {
    setBtnText(btnTextByProp);
  }, [isArticleOnList]);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BackBtn />
        <Button style={btnStyle} title={btnText} onPress={onPress} />
      </View>
      <WebView style={style} source={{uri: url}} />
    </View>
  );
};

export default WebViewBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: 100,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  red: {
    color: 'red',
    backgroundColor: 'red',
  },
  blue: {
    color: 'green',
  },
});
