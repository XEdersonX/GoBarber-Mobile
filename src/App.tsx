import React from 'react';
import { View, StatusBar } from 'react-native'; // nossa view que é a div em branco.

// construir o componente chamado App, que vai ser fuction componente
const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <View style={{ flex: 1, backgroundColor: '#312e38' }} />
  </>
);

export default App;
