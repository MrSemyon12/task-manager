import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

import { Project } from '../types';

type ProjectContext = {
  project: Project | null;
  setProject: Dispatch<SetStateAction<Project | null>>;
};

export const ProjectContext = createContext<ProjectContext | null>(null);

type ProjectProviderProps = { children: ReactNode };

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [project, setProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
