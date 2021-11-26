import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, FlatList, RefreshControl, View} from 'react-native';
import screenNames from '../../utils/screenNames';
import Card from '../card/Card';
import TextComp from '../textComp/TextComp';

const RenderArticles = props => {
  const {articles, ListHeaderComponent, onPress, onRefresh, refreshing} = props;
  const navigation = useNavigation();
  const onCardPress = article => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate(screenNames.ArticleData, {
        article: article,
      });
    }
  };
  return (
    <FlatList
      data={articles}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      numColumns={1}
      ListEmptyComponent={<View style={{flex:1, justifyContent:"center"}}><TextComp style={{color:"black"}}>empty</TextComp></View>}
      initialNumToRender={10}
      renderItem={({item}) =>
        item ? <Card article={item} onPress={() => onCardPress(item)} /> : null
      }
      keyExtractor={(item, index) => index}
      refreshControl={
        onRefresh && (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        )
      }
    />
  );
};

export default RenderArticles;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingBottom: 30,
    alignItems: 'center',
  },
});
