import { useContext } from 'react';

import { ProjectContext } from '../contexts';

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used whithin a ProjectContextProvider');
  }

  return context;
};
