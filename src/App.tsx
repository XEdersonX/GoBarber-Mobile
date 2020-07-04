import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native'; // nossa view que é a div em branco.
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes'; // já puxa o arquivo index de form automatica

// construir o componente chamado App, que vai ser fuction componente
const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
