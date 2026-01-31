import { useContext } from "react";
import { GameContext } from "./GameContext";

export function useGames() {
  return useContext(GameContext);
}
