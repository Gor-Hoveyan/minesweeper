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
          onClick={() => isOngoing && openCell(rowIndex, cellIndex)}
          className={`w-8 h-8 ${
            cell.isBomb &&
            "bg-red-500 text-black  hover:bg-red-600 duration-300"
          } flex items-center justify-center border border-white hover:bg-lime-400 hover:text-green-600 duration-300`}
          onContextMenu={() => setFlag(rowIndex, cellIndex)}
        >
          {cell.isBomb ? <FaBomb /> : cell.minesNear}
        </td>
      ) : (
        <td
          onClick={() => isOngoing && openCell(rowIndex, cellIndex)}
          className="bg-green-500 w-8 h-8 border border-white flex items-center justify-center hover:bg-green-600 duration-300"
          onContextMenu={() => setFlag(rowIndex, cellIndex)}
        >
          {cell.isFlagged ? <IoFlagSharp color="red" /> : ""}
        </td>
      )}
    </>
  );
}
