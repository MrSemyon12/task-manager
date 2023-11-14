import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

import { Project } from '../types';

type ProjectContextProp = {
  curProject: Project | null;
  setCurProject: Dispatch<SetStateAction<Project | null>>;
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
};

export const ProjectContext = createContext<ProjectContextProp | null>(null);

type ProjectProviderProps = { children: ReactNode };

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [curProject, setCurProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <ProjectContext.Provider
      value={{
        curProject,
        setCurProject,
        projects,
        setProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
