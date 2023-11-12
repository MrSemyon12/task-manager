import api from '../api/axios';
import { useAuth } from './useAuth';

const REFRESH_URL = '/auth/refresh';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await api.get(REFRESH_URL, {
      withCredentials: true,
    });
    setAuth(response.data);
    return response.data.access_token;
  };

  return refresh;
};
