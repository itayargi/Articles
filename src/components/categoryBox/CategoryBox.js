import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../utils/Colors';

const CategoryBox = props => {
  const {category, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.category}>
      <ImageBackground style={styles.background} source={{uri: category.image}}>
        <Text style={styles.text}>{category.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryBox;

const styles = StyleSheet.create({
  category: {
    width: '30%',
    height: 100,
    backgroundColor: Colors.categoryBackground,
    margin: 10,
    elevation: 11,
    borderRadius: 15,
    overflow:"hidden"
  },
  background: {
    justifyContent: 'center',
    flex: 1,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    padding:5,
    backgroundColor:Colors.white,
    opacity:0.8,
    color:"black",
    fontSize: 16,
  },
});
