import { useEffect, useRef, useState } from "react";
import "./App.css";
import CreationForm from "./components/CreationForm";
import CellComponent from "./components/CellComponent";
import GameData from "./components/GameData";

export type Cell = {
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
  const [minesCount, setMinesCount] = useState<number>(0);
  const [flagsCount, setFlagsCount] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const openedCells = useRef(0);

  function generateTable(rows: number, cols: number) {
    openedCells.current = 0;
    setTable([]);
    setFlagsCount(0);
    setMinesCount(0);
    setIsOngoing(false);
    setTimer(0);
    setIsWin(false);
    const initialTable: Table = [];
    setMinesCount(0);
    for (let i = 0; i < rows; i++) {
      const row = generateRow(cols);
      initialTable.push(row);
      for (let j = 0; j < rows; j++) {
        if (row[j].isBomb) {
          setMinesCount((mines) => ++mines);
        }
      }
    }
    setIsOngoing(true);
    setTimer(0);
    setTable(initialTable);
  }

  function openCell(rowIndex: number, cellIndex: number) {
    const newTable = [...table];
    if (
      newTable[rowIndex][cellIndex] &&
      !newTable[rowIndex][cellIndex].isFlagged
    ) {
      const newCell = newTable[rowIndex][cellIndex];
      if (!newCell.isBomb) {
        newCell.minesNear = countNearBombs(newTable, rowIndex, cellIndex);
      } else {
        setTable(showBombs(table));
        setIsOngoing(false);
      }

      newCell.isOpened = true;
      openedCells.current++;
      newTable[rowIndex][cellIndex] = newCell;
      setTable(newTable);
      if (newCell.minesNear === 0 && !newCell.isBomb) {
        setTimeout(() => {
          openNearCells(rowIndex, cellIndex);
        }, 20);
      }
    }
    if (table.length * table[0].length - minesCount === openedCells.current) {
      setIsOngoing(false);
      setIsWin(true);
    }
  }

  function openNearCells(rowIndex: number, cellIndex: number) {
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
      const row = rowIndex + rowOffset;
      const cell = cellIndex + cellOffset;
      if (
        table &&
        table[row] &&
        table[row][cell] &&
        row >= 0 &&
        cell >= 0 &&
        !table[row][cell].isOpened
      ) {
        openCell(row, cell);
      }
    });
  }

  function setFlag(rowIndex: number, cellIndex: number) {
    const newTable = [...table];
    if (newTable[rowIndex][cellIndex]) {
      const newCell = newTable[rowIndex][cellIndex];
      newCell.isFlagged = !newCell.isFlagged;
      if (newCell.isFlagged) {
        setFlagsCount((flagsCount) => ++flagsCount);
      } else {
        setFlagsCount((flagsCount) => --flagsCount);
      }
      newTable[rowIndex][cellIndex] = newCell;
      setTable(newTable);
    }
  }

  useEffect(() => {
    let interval: number;
    if (isOngoing) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isOngoing, timer]);

  return (
    <main className="text-center bg-lime-300 w-full min-h-[100vh] max-h-fit flex flex-col items-center justify-center">
      <h1 className="text-5xl mb-24 text-blue-500 font-extrabold">
        Minesweeper
      </h1>
      <div className="text-green-500 flex items-center justify-center select-none">
        <CreationForm generateTable={generateTable} />
        <div>
          <GameData
            timer={timer}
            flagsCount={flagsCount}
            minesCount={minesCount}
            isOngoing={isOngoing}
          />
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
                          return (
                            <CellComponent
                              isWin={isWin}
                              cell={cell}
                              cellIndex={cellIndex}
                              rowIndex={rowIndex}
                              setFlag={setFlag}
                              openCell={openCell}
                              isOngoing={isOngoing}
                              key={rowIndex * row.length + cellIndex}
                            />
                          );
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
