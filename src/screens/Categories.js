import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CategoryBox from '../components/categoryBox/CategoryBox';
import categoriesList from '../data/categoriesList';
import screenNames from '../utils/screenNames';

const Categories = ({navigation}) => {


const onCategoryPress=(categoryName)=>{
    navigation.navigate(screenNames.ArticlesList, {
      title:categoryName
      });
}

  const renderCategories = (arr = []) => {
    return arr?.map(category => <CategoryBox key={category.id} onPress={()=>onCategoryPress(category.title.toLowerCase())} category={category} />);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.categories}>{renderCategories(categoriesList)}</ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
    },
    categories:{
        flexDirection:"row",
        flexWrap:"wrap", justifyContent:"center",
    },
});
