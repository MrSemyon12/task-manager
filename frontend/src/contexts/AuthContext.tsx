import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export type Auth = {
  accessToken: string;
  tokenType: string;
};

interface IAuthContext {
  auth: Auth | {};
  setAuth: Dispatch<SetStateAction<Auth>>;
}

const defaultState = {
  auth: {},
} as IAuthContext;

const AuthContext = createContext(defaultState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | {}>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
