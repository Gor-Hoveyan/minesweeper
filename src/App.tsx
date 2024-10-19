import { useState } from "react";
import { FaBomb } from "react-icons/fa";
import { IoFlagSharp } from "react-icons/io5";
import "./App.css";
import CreationForm from "./components/CreationForm";

type Cell = {
  isOpened: boolean;
  isFlagged: boolean;
  minesNear: number;
  isBomb: boolean;
};

type Row = Cell[];

type Table = Row[];

function App() {
  const [table, setTable] = useState<Table>([]);
  const [isOngoing, setIsOngoing] = useState<boolean>(false);

  function generateTable(rows: number, cols: number) {
    setTable([]);
    const initialTable: Table = [];
    for (let i = 0; i < rows; i++) {
      const row = generateRow(cols);
      initialTable.push(row);
    }
    setTable(initialTable);
    setIsOngoing(true);
  }

  function openCell(rowIndex: number, cellIndex: number) {
    const newTable = [...table];
    if (newTable[rowIndex][cellIndex]) {
      const newCell = newTable[rowIndex][cellIndex];

      if (!newCell.isBomb) {
        newCell.minesNear = countNearBombs(newTable, rowIndex, cellIndex);
      } else {
        setTable(showBombs(table));
        setIsOngoing(false);
      }

      newCell.isOpened = true;
      newTable[rowIndex][cellIndex] = newCell;
      setTable(newTable);
    }
  }

  function setFlag(rowIndex: number, cellIndex: number) {
    const newTable = [...table];
    if (newTable[rowIndex][cellIndex]) {
      const newCell = newTable[rowIndex][cellIndex];
      newCell.isFlagged = !newCell.isFlagged;
      newTable[rowIndex][cellIndex] = newCell;
      setTable(newTable);
    }
  }

  return (
    <main className="text-center bg-lime-300 w-full h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-5xl mb-24 text-blue-500 font-extrabold">
        Minesweeper
      </h1>
      <div className="text-green-500 flex items-center justify-center">
        <CreationForm generateTable={generateTable} />
        <div>
          <table
            className="rounded-lg"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
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
                                onClick={() =>
                                  isOngoing && openCell(rowIndex, cellIndex)
                                }
                                className={`w-8 h-8 ${
                                  cell.isBomb && "bg-red-500 text-black"
                                } flex items-center justify-center border border-white`}
                                onContextMenu={() =>
                                  setFlag(rowIndex, cellIndex)
                                }
                              >
                                {cell.isBomb ? <FaBomb /> : cell.minesNear}
                              </td>
                            );
                          } else {
                            return (
                              <td
                                key={cellIndex + 10}
                                onClick={() =>
                                  isOngoing && openCell(rowIndex, cellIndex)
                                }
                                className="bg-green-500 w-8 h-8 border border-white flex items-center justify-center"
                                onContextMenu={() =>
                                  setFlag(rowIndex, cellIndex)
                                }
                              >
                                {cell.isFlagged ? (
                                  <IoFlagSharp color="red" />
                                ) : (
                                  ""
                                )}
                              </td>
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
    </main>
  );
}

function generateRow(cols: number): Row {
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

function showBombs(table: Table) {
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

export default App;
