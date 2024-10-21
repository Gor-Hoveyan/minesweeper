import { useEffect, useRef, useState } from "react";
import "./App.css";
import CreationForm from "./components/CreationForm";
import CellComponent from "./components/CellComponent";
import GameState from "./components/GameState";
import showBombs from "./utils/functions/showBombs";
import generateRow from "./utils/functions/generateRow";
import countNearBombs from "./utils/functions/countNearBombs";
import { Table } from "./utils/types/tableTypes";
import logRoundData from "./utils/functions/logRoundData";
import GameHistory from "./components/GameHistory";

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
      logRoundData(timer, table.length, table[0].length, minesCount);
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
          <GameState
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
      <GameHistory />
    </main>
  );
}

export default App;
