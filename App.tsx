/**
 * App Gallery
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GalleryDetailsScreen from './Screens/GalleryDetailsScreen';
import GalleryScreen from './Screens/GalleryScreen';
import * as locale from './i18n/locale.json';

const RootStack = createStackNavigator ();


class App extends Component {

  constructor(props: React.Component){
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
        <RootStack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{ title: locale.en.gallery }}
        />
        <RootStack.Screen name="GalleryDetails" 
          component={GalleryDetailsScreen}
          options={{ title: locale.en.gallerydetails }} />
      </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;