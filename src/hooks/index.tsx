import React from 'react';

import { AuthProvider } from './auth';

const AppProvider: React.FC = (
  { children }, // Nosso children sao os elementos internos
) => <AuthProvider>{children}</AuthProvider>;

export default AppProvider;
