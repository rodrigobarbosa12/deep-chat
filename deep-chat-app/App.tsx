import React, { ReactElement } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import Toast from 'react-native-toast-message';
import Router from './src/Router';

const theme = extendTheme({
  colors: {
    deep: {
      bg: '#1f2937',
    },
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
  },
  config: {
    initialColorMode: 'dark',
  },
});

const App = (): ReactElement => (
  <>
    <NativeBaseProvider theme={theme}>
      <Router />
    </NativeBaseProvider>
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </>
);

export default App;
