import api from '../api/axios';
import { LOGOUT_URL } from '../api/urls';
import { useAuth } from './useAuth';

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
