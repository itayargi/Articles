import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet,RefreshControl} from 'react-native';
import { getArticlesByCategory} from '../api/api';
import BG from '../components/bg/BG';
import Card from '../components/card/Card';
import screenNames from '../utils/screenNames';

const ArticlesList = ({route, navigation}) => {

  const {title} = route.params;
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const params = {
    bg: {
      style: styles.container,
    },
  };

  const fetchArticles = () => {
    getArticlesByCategory(title)
      .then(res => res.json())
      .then(resJson => {
        resJson?.data && setArticles(resJson.data);
        // console.log('resJson', resJson);
      });
  };
const onCardPress=(url)=>{
    console.log('url', url);
    navigation.navigate(screenNames.ArticleData,{
        url:url
    })
}
  const onRefresh = () => {};
  useEffect(() => {
    title && fetchArticles();
  }, []);

  return (
    <BG {...params.bg}>
      <FlatList
        data={articles}
        contentContainerStyle={{marginTop: 10, paddingBottom: 30,   }}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        // horizontal={true}
        initialNumToRender={10}
        renderItem={({item}) => (item ? <Card article={item} onPress={onCardPress} /> : null)}
        keyExtractor={(item, index) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </BG>
  );
};

export default ArticlesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center"
  },
  list: {},
});
