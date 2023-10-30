import { useAuth } from './useAuth';

export const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(null);
  };

  return logout;
};
