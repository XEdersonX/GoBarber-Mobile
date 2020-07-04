import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

// interface para informar o formato do context
interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); // as é para iniciar com um objeto vazio para o type scripty permitir isso.

// Criando componente
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  // Assim que este componente for exido em tela vou disparar uma função. Funcao vai la no storage e busca os valores.
  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      // Verificar se tem informacao armazenada ali dentro
      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) }); // Usar json.parse para coletar os dados, porque salvei usando json.stringfy
      }
    }

    loadStoragedData();
  }, []);

  // Faz Autheticacao
  const signIn = useCallback(async ({ email, password }) => {
    // console.log('singIn');
    const response = await api.post('sessions', {
      email,
      password,
    });

    // console.log(response.data);
    const { token, user } = response.data;

    // await AsyncStorage.setItem('@GoBarber:token', token);
    // await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    // await AsyncStorage.removeItem('@GoBarber:token');
    // await AsyncStorage.removeItem('@GoBarber:user');

    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  // Se o context no foi criado
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// export default AuthContext;
export { AuthProvider, useAuth };
