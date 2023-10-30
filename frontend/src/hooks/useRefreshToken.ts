import api from '../api/axios';
import { useAuth } from './useAuth';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await api.get('refresh', { withCredentials: true });
    setAuth(response.data);
    return response.data.accessToken;
  };

  return refresh;
};
