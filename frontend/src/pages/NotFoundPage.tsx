import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

import { Center } from '../components';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Center>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </Center>
  );
};
