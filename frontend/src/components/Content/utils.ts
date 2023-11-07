import { Task } from '../../types';

export const reorder = (list: Task[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const remove = (list: Task[], index: number) => {
  const result = [...list];
  result.splice(index, 1);
  return result;
};

export const appendAt = (list: Task[], index: number, pokemon: Task) => {
  const result = [...list];
  result.splice(index, 0, pokemon);
  return result;
};
