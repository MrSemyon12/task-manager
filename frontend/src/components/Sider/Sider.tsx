import React, { useState } from 'react';

import { Layout, Card, Space, Button } from 'antd';

const { Sider: AntdSider } = Layout;
const { Meta } = Card;

const item = (
  <Card
    hoverable
    style={{ width: '100%' }}
    // cover={
    //   <img
    //     alt='example'
    //     src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    //   />
    // }
  >
    <Meta title='Europe Street beat' description='www.instagram.com' />
  </Card>
);

const cards = [...Array(2)].map((_) => item);

export const Sider: React.FC = () => {
  const [items, setItems] = useState(cards);

  const add = () => {
    setItems([...items, item]);
  };

  return (
    <AntdSider
      width={284}
      style={{
        overflow: 'auto',
        height: '85vh',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        justifyContent: 'center',
      }}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button onClick={add}>add</Button>
        {items}
      </Space>
    </AntdSider>
  );
};
