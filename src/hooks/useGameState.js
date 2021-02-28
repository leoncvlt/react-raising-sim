import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export const useGameState = () => {
  const { state, dispatch } = useContext(GameContext);
  return { state, dispatch };
};
