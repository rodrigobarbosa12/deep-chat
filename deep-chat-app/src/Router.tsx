import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Chat from './pages/Chat';

const { Navigator, Screen } = createNativeStackNavigator();

const App = (): ReactElement => (
  <NavigationContainer>
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Navigator>
  </NavigationContainer>
);

export default App;
