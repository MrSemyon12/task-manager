import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider, ProjectProvider, BoardProvider } from './contexts';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <BoardProvider>
          <App />
        </BoardProvider>
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);
