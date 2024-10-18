import { useState } from "react";
import "./App.css";

type Cell = {
  isOpened: boolean;
  minesNear: number;
  isBomb: boolean;
};

type Row = Cell[];

type Table = Row[];

function App() {
  const [table, setTable] = useState<Table>([]);

  function generateTable(size: number) {
    setTable([]);
    const initialTable: Table = [];
    for (let i = 0; i < size; i++) {
      const row = generateRow(size);
      initialTable.push(row);
    }
    setTable(initialTable);
  }

  function openCell(rowIndex: number, cellIndex: number) {
    const newTable = [...table];
    if (newTable[rowIndex][cellIndex]) {
      const newCell = newTable[rowIndex][cellIndex];

      if (!newCell.isBomb) {
        newCell.minesNear = countNearBombs(newTable, rowIndex, cellIndex);
      } else {
        setTable([]);
        alert("Game over");
        generateTable(10);
      }

      newCell.isOpened = true;
      newTable[rowIndex][cellIndex] = newCell;
      setTable(newTable);
    }
  }

  return (
    <div className="bg-lime-300 w-full h-[100vh] text-green-500 flex items-center justify-center">
      <button
        onClick={() => generateTable(10)}
        className="bg-red-500 rounded-xl text-white p-3"
      >
        Create
      </button>
      <div>
        <table className="rounded-lg">
          <tbody>
            {table
              ? table.map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex} className="flex">
                      {row.map((cell, cellIndex) => {
                        if (cell.isOpened) {
                          return (
                            <td
                              key={cellIndex + 10}
                              onClick={() => openCell(rowIndex, cellIndex)}
                              className="w-5 h-5  flex items-center justify-center border border-white"
                            >
                              {cell.isBomb ? "B" : cell.minesNear}
                            </td>
                          );
                        } else {
                          return (
                            <td
                              key={cellIndex + 10}
                              onClick={() => openCell(rowIndex, cellIndex)}
                              className="bg-green-500 w-5 h-5 border border-white flex items-center justify-center"
                            ></td>
                          );
                        }
                      })}
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function generateRow(size: number): Row {
  const row: Cell[] = [];
  for (let i = 0; i < size; i++) {
    const newCell = generateCell();
    row.push(newCell);
  }
  return row;
}

function generateCell(): Cell {
  const newCell: Cell = {
    isOpened: false,
    isBomb: Boolean(Math.round(Math.random() - 0.3)),
    minesNear: 0,
  };
  return newCell;
}

function countNearBombs(table: Table, rowIndex: number, cellIndex: number) {
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

export default App;
