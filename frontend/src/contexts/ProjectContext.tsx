import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
};

type ProjectContext = {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
};

export const ProjectContext = createContext<ProjectContext | null>(null);

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
