import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import imageIndex from '../../assets/images/imageIndex';

const BackBtn = (props) => {
    const {style} =props
    const navigation = useNavigation();
    const onBtnPress=()=>{
        navigation.goBack()
    }
  return (
    <TouchableOpacity style={style} onPress={onBtnPress}>
      <Image source={imageIndex.backBtn()} style={[styles.image,]} />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
    image:{
        width: 35, 
        height: 35
    },
});
