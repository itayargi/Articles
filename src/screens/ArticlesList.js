import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet,RefreshControl} from 'react-native';
import { getArticlesByCategory} from '../api/api';
import BG from '../components/bg/BG';
import Card from '../components/card/Card';

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
        console.log('resJson', resJson);
      });
  };

  const onRefresh = () => {};
  useEffect(() => {
    title && fetchArticles();
  }, []);

  return (
    <BG {...params.bg}>
      <FlatList
        data={articles}
        contentContainerStyle={{marginTop: 10, paddingBottom: 30,    }}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        initialNumToRender={10}
        renderItem={({item}) => (item ? <Card article={item} /> : null)}
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
