export type Cell = {
  isOpened: boolean;
  isFlagged: boolean;
  minesNear: number;
  isBomb: boolean;
};

export type Row = Cell[];

export type Table = Row[];
