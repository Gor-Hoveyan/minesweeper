import { Table } from "../types/tableTypes";

export default function showBombs(table: Table) {
  const newTable = [...table];
  for (let i = 0; i < newTable.length; i++) {
    for (let j = 0; j < newTable[i].length; j++) {
      if (newTable[i][j].isBomb) {
        newTable[i][j].isOpened = true;
      }
    }
  }
  return newTable;
}
