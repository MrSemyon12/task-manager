import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { Main, Auth, NotFound } from './pages';

const App: React.FC = () => {
  return (
    <Routes>
      <Route index path='/' element={<Main />}></Route>
      <Route path='/auth' element={<Auth />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;
