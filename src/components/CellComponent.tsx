import { FaBomb } from "react-icons/fa";
import { IoFlagSharp } from "react-icons/io5";
import { RiFlowerFill } from "react-icons/ri";
import { Cell } from "../utils/types/tableTypes";
import { PiFlowerTulip } from "react-icons/pi";

interface ComponentProps {
  cellIndex: number;
  rowIndex: number;
  isOngoing: boolean;
  openCell: (rowIndex: number, cellIndex: number) => void;
  cell: Cell;
  setFlag: (rowIndex: number, cellIndex: number) => void;
  isWin: boolean;
}

export default function CellComponent({
  cellIndex,
  rowIndex,
  isOngoing,
  openCell,
  cell,
  setFlag,
  isWin,
}: ComponentProps) {
  return (
    <>
      {cell.isOpened || isWin ? (
        <td
          onClick={() => isOngoing && openCell(rowIndex, cellIndex)}
          className={`lg:w-8 lg:h-8 md:w-6 md:h-6 h-4 w-4 text-xs md:text-base lg:text-lg ${
            cell.isBomb && !isWin
              ? "bg-red-500 text-black  hover:bg-red-600 duration-300"
              : "text-blue-500"
          } flex items-center justify-center border border-white hover:bg-lime-400 duration-300`}
          onContextMenu={() => isOngoing && setFlag(rowIndex, cellIndex)}
        >
          {cell.isBomb ? (
            isWin ? (
              <RiFlowerFill />
            ) : (
              <FaBomb />
            )
          ) : cell.minesNear ? (
            cell.minesNear
          ) : (
            <PiFlowerTulip className="text-purple-500" />
          )}
        </td>
      ) : (
        <td
          onClick={() => isOngoing && openCell(rowIndex, cellIndex)}
          className="bg-green-500 lg:w-8 lg:h-8 sm:w-4 sm:h-4 md:w-6 md:h-6 h-4 w-4 md:text-base lg:text-lg border border-white flex items-center justify-center hover:bg-green-600 duration-300"
          onContextMenu={() => isOngoing && setFlag(rowIndex, cellIndex)}
        >
          {cell.isFlagged ? <IoFlagSharp color="red" /> : ""}
        </td>
      )}
    </>
  );
}
