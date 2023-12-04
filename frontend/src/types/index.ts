export type Auth = {
  access_token: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  is_private: boolean;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  state: State;
  priority: Priority;
};

export type State = {
  id: number;
  title: string;
};

export type Priority = {
  id: number;
  title: string;
};

export type Board = {
  open: Task[];
  progress: Task[];
  done: Task[];
  closed: Task[];
};

export type User = {
  user: {
    id: number;
    username: string;
    email: string;
  };
  role: {
    id: number;
    title: string;
  };
};
