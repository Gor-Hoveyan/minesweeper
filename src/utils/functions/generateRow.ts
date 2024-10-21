import { Cell, Row } from "../types/tableTypes";

export default function generateRow(cols: number): Row {
  const row: Cell[] = [];
  for (let i = 0; i < cols; i++) {
    const newCell = generateCell();
    row.push(newCell);
  }
  return row;
}

function generateCell(): Cell {
  const newCell: Cell = {
    isOpened: false,
    isBomb: Boolean(Math.round(Math.random() - 0.3)),
    isFlagged: false,
    minesNear: 0,
  };
  return newCell;
}
