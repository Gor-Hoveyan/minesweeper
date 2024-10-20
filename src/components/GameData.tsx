interface ComponentProps {
  isOngoing: boolean;
  minesCount: number;
  flagsCount: number;
  timer: number;
}
import { FaBomb } from "react-icons/fa";
import { IoFlagSharp } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";

export default function GameData({
  isOngoing,
  minesCount,
  flagsCount,
  timer,
}: ComponentProps) {
  return (
    <div className="flex justify-around text-blue-500 font-bold text-lg">
      <div>
        {isOngoing || timer ? (
          <span className="flex items-center">
            {transformTime(timer)}
            <GiSandsOfTime className="ml-1 text-orange-600" />
          </span>
        ) : (
          ""
        )}
      </div>
      <div>
        {isOngoing || minesCount ? (
          <span className="flex items-center">
            {minesCount}
            <FaBomb className="ml-2" color="black" />
          </span>
        ) : (
          ""
        )}
      </div>
      <div>
        {isOngoing || flagsCount ? (
          <span className="flex items-center">
            {flagsCount}
            <IoFlagSharp className="ml-2" color="red" />
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function transformTime(time: number): string {
  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = time % 60;
  if (minutes < 9) {
    minutes = "0" + minutes;
  }
  if (seconds < 9) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}
