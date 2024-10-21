import { Table } from "../types/tableTypes";

export default function countNearBombs(
  table: Table,
  rowIndex: number,
  cellIndex: number
) {
  let minesNear = 0;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  directions.forEach(([rowOffset, cellOffset]) => {
    const newRow = rowIndex + rowOffset;
    const newCell = cellIndex + cellOffset;

    if (
      newRow >= 0 &&
      newRow < table.length &&
      newCell >= 0 &&
      newCell < table[newRow].length
    ) {
      if (table[newRow][newCell].isBomb) {
        minesNear++;
      }
    }
  });

  return minesNear;
}
