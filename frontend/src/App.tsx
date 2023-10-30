import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginPage, RegisterPage, MainPage, NotFoundPage } from './pages';
import { PersistLogin, RequireAuth } from './components/Auth';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='/' element={<MainPage />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
