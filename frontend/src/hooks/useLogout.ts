import api from '../api/axios';
import { useAuth } from './useAuth';

const LOGOUT_URL = '/auth/logout';

export const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(null);
    try {
      await api.get(LOGOUT_URL, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};
