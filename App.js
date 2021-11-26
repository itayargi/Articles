import React from 'react';
import {StyleSheet, I18nManager, View} from 'react-native';
import Navigator from './navigation/Navigator';
import {AppProvider} from './store/AppProvider';

I18nManager.allowRTL(false);

const App = () => {
  return (
    <AppProvider>
         <Navigator />
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
