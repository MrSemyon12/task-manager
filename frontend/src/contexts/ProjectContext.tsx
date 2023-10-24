import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export type Project = {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
};

interface IProjectContext {
  projects: Project[] | [];
  setProjects: Dispatch<SetStateAction<Project[]>>;
}

const defaultState = {
  projects: [],
} as IProjectContext;

export const ProjectContext = createContext(defaultState);

type ProjectProviderProps = { children: ReactNode };

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
