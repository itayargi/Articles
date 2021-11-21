import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigator from './navigation/Navigator';
import AppContext from './store/AppContext';
import {AppProvider} from './store/AppProvider';

const App = () => {
  return (
    <AppProvider>
         <Navigator />
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
