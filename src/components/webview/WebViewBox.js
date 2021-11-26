import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import strings from '../../utils/strings';
import Loader from '../Loader/Loader';
const WebViewBox = props => {
  const navigation = useNavigation();
  const demoUrl =
    'https://seekingalpha.com/news/3723980-blackrock-muniyield-new-jersey-fund-declares-missing-dividend?utm_source=feed_news_all&utm_medium=referral';
  const {url, style, onPress, isArticleOnList} = props;
  const btnTextByProp = isArticleOnList
    ? strings.removeFromFavorites
    : strings.addToFavorites;
  const [btnText, setBtnText] = useState(btnTextByProp);
  const [isLoading, setIsLoading] = useState();
  const btnStyle = isArticleOnList ? styles.red : styles.blue;
  const handleBack = () => {
    navigation.goBack();
  };
const updateLoadingState= (syntheticEvent)=>{
    const { nativeEvent } = syntheticEvent;
    setIsLoading(nativeEvent.loading)
}
  
  useEffect(() => {
    setBtnText(btnTextByProp);
  }, [isArticleOnList]);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button style={btnStyle} title={btnText} onPress={onPress} />
        <Button title={'back'} onPress={handleBack} />
      </View>
      <WebView style={style} source={{uri: url}}    />
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
