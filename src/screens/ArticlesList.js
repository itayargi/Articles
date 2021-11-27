import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {getArticlesByCategory} from '../api/api';
import BG from '../components/bg/BG';
import Loader from '../components/Loader/Loader';
import RenderArticles from '../components/renderArticles/RenderArticles';
import TextComp from '../components/textComp/TextComp';
import screenNames from '../utils/screenNames';

const ArticlesList = ({route, navigation}) => {
  const {title} = route.params;
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = {
    bg: {
      style: styles.container,
    },
    render: {
      articles: articles,
      refreshing: refreshing,
      onRefresh: () => onRefresh(),
    },
  };

  const fetchArticles = () => {
    setIsLoading(true);
    getArticlesByCategory(title)
      .then(res => res.json())
      .then(resJson => {
        resJson?.data && setArticles(resJson.data);
        setIsLoading(false);
      }).catch((error)=>Alert.alert(error?.message?.toString()))
  };

  const onRefresh = () => {
    fetchArticles();
  };
  useEffect(() => {
    title && fetchArticles();
  }, []);

  if(isLoading) return <Loader />
  return (
    <BG {...params.bg}>
      <RenderArticles {...params.render} />
    </BG>
  );
};

export default ArticlesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {},
});
