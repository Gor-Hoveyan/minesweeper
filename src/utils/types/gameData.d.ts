export interface GameData {
  rounds: RoundData[];
}

export interface RoundData {
  time: number;
  size: {
    cols: number;
    rows: number;
  };
  minesCount: number;
  date: number;
}
