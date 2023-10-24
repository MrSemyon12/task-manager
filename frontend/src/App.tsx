import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { Main, Auth, NotFound } from './pages';

const App: React.FC = () => {
  return (
    <Routes>
      <Route index path='/' element={<Main />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
