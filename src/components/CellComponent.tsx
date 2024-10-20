import { Cell } from "../App";
import { FaBomb } from "react-icons/fa";
import { IoFlagSharp } from "react-icons/io5";

interface ComponentProps {
  cellIndex: number;
  rowIndex: number;
  isOngoing: boolean;
  openCell: (rowIndex: number, cellIndex: number) => void;
  cell: Cell;
  setFlag: (rowIndex: number, cellIndex: number) => void;
}

export default function CellComponent({
  cellIndex,
  rowIndex,
  isOngoing,
  openCell,
  cell,
  setFlag,
}: ComponentProps) {
  return (
    <>
      {cell.isOpened ? (
        <td
          key={cellIndex + 10}
          onClick={() => isOngoing && openCell(rowIndex, cellIndex)}
          className={`w-8 h-8 ${
            cell.isBomb && "bg-red-500 text-black"
          } flex items-center justify-center border border-white`}
          onContextMenu={() => setFlag(rowIndex, cellIndex)}
        >
          {cell.isBomb ? <FaBomb /> : cell.minesNear}
        </td>
      ) : (
        <td
          key={cellIndex + 10}
          onClick={() => isOngoing && openCell(rowIndex, cellIndex)}
          className="bg-green-500 w-8 h-8 border border-white flex items-center justify-center"
          onContextMenu={() => setFlag(rowIndex, cellIndex)}
        >
          {cell.isFlagged ? <IoFlagSharp color="red" /> : ""}
        </td>
      )}
    </>
  );
}