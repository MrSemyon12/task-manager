import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

import { Board } from '../types';

type BoardContextProp = {
  board: Board;
  setBoard: Dispatch<SetStateAction<Board>>;
};

export const BoardContext = createContext<BoardContextProp | null>(null);

type BoardProviderProps = { children: ReactNode };

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<Board>({
    open: [],
    progress: [],
    done: [],
    closed: [],
  });

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
