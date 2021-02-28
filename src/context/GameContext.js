import yaml from "js-yaml";
import React, { useReducer } from "react";
import initialState from "../data/state.yaml";

export const GameContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_MONEY":
      return { ...state, money: state.money + action.payload.value };
    case "CHANGE_STAT":
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.payload.stat]:
            state.stats[action.payload.stat] + action.payload.value
        }
      };
    default:
      throw new Error("Unknown reducer action");
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, yaml.load(initialState));

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
