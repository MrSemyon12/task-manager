import React, { useState } from 'react';

import { Layout, Card, Space, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

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

const cards = [...Array(0)].map((_) => item);

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
        height: 'calc(100vh - 108px)',
        backgroundColor: '#f5f5f5',
        padding: 10,
        justifyContent: 'center',
        background: 'blue',
      }}
    >
      <Space direction='vertical' style={{ width: '100%', paddingBottom: 10 }}>
        <Button type='primary' onClick={add} style={{ width: '100%' }}>
          <PlusOutlined />
          Create Project
        </Button>
        {items}
      </Space>
    </AntdSider>
  );
};
