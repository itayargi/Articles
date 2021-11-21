import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppContext from '../../../store/AppContext';

const TextComp = props => {
  const {getDirections} = useContext(AppContext);
  const {style, alignText} = props;

  const textParams = {
    style: [
      styles.text,
      style,
      alignText !== false && {
        textAlign: getDirections.align,
      },
    ],
    ...props,
  };
  return <Text {...textParams}>{props.children}</Text>;
};

export default TextComp;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#042464',
  },
});
