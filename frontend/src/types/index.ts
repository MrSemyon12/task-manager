export type Auth = {
  access_token: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
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
