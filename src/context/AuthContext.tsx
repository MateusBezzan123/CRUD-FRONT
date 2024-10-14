import { createContext, useState, ReactNode } from 'react';
import { authenticate } from '../services/authService';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, senha: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (email: string, senha: string) => {
    const auth = authenticate(email, senha);
    setIsAuthenticated(auth);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};
