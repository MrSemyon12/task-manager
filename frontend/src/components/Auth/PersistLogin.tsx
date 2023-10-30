import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth, useRefreshToken } from '../../hooks';

export const PersistLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <h1>Loding...</h1> : <Outlet />}</>;
};
