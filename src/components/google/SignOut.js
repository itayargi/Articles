import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AppContext from '../../../store/AppContext';
import imageIndex from '../../assets/images/imageIndex';
import TextComp from '../textComp/TextComp';
import strings from '../../utils/strings';

const SignOut = (props) => {
    const {style, disabled} =props
  const {signOutUser} = useContext(AppContext);

  const params = {
    image: {
      source: imageIndex.logout(),
      style: styles.image,
    },
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      signOutUser();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity disabled={disabled} style={[styles.touch,style]} onPress={signOut}>
      <Image {...params.image} />
      <TextComp>{strings.logOut}</TextComp>
    </TouchableOpacity>
  );
};

export default SignOut;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
  touch: {
    alignItems: 'center',
  },
});
