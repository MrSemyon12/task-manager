import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { LoginPage, RegisterPage, MainPage, NotFoundPage } from './pages';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
