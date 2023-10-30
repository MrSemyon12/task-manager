import { useEffect } from 'react';

import { useRefreshToken } from './useRefreshToken';
import { apiPrivate } from '../api/axios';
import { useAuth } from './useAuth';

export const useApiPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntersept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntersept = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status == 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return apiPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestIntersept);
      apiPrivate.interceptors.response.eject(responseIntersept);
    };
  }, [auth, refresh]);

  return apiPrivate;
};
