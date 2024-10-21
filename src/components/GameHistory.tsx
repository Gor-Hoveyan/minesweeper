import getGameHistory from "../utils/functions/getGameHistory";
import { GameData } from "../utils/types/gameData";
import { FaBomb, FaRegCalendarCheck } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { SlSizeFullscreen } from "react-icons/sl";
import tranformDate from "../utils/functions/tranformDate";
import transformTime from "../utils/functions/transformTime";

export default function GameHistory() {
  const gameData: false | GameData = getGameHistory();
  return (
    <>
      {gameData ? (
        <section className="mt-14 w-full text-blue-600 border-t border-white border-opacity-70">
          {gameData.rounds.map((round, index) => {
            return (
              <section
                key={index}
                className="flex w-full flex-row py-5 border-b border-white border-opacity-70 items-center justify-evenly"
              >
                <section className="flex flex-row w-fit  items-center">
                  {tranformDate(round.date)}
                  <FaRegCalendarCheck className="ml-2" color="green" />
                </section>
                <section className="flex flex-row w-fit  items-center">
                  {round.size.rows}X{round.size.cols}
                  <SlSizeFullscreen className="ml-2" color="red" />
                </section>
                <section className="flex flex-row w-fit items-center">
                  {transformTime(round.time)}
                  <GiSandsOfTime className="ml-2 text-orange-600" />
                </section>
                <section className="flex flex-row w-fit items-center">
                  {round.minesCount}
                  <FaBomb className="ml-2" color="black" />
                </section>{" "}
              </section>
            );
          })}
        </section>
      ) : (
        ""
      )}
    </>
  );
}
