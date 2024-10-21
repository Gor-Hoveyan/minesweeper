import { GameData } from "../types/gameData";

export default function getGameHistory(): GameData | false {
  const data = localStorage.getItem("gameData");
  if (!data) {
    return false;
  } else {
    const gameData: GameData = JSON.parse(data);
    return gameData;
  }
}
