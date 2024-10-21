import { GameData, RoundData } from "../types/gameData";

export default function logRoundData(
  time: number,
  rows: number,
  cols: number,
  minesCount: number
) {
  const size = { rows, cols };
  const roundData: RoundData = { time, size, minesCount, date: Date.now() };
  const data: string | null = localStorage.getItem("gameData");
  if (!data) {
    localStorage.setItem("gameData", `{"rounds": []}`);
    logRoundData(time, rows, cols, minesCount);
  } else {
    const gameData: GameData = JSON.parse(data);
    gameData.rounds.push(roundData);
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }
}
