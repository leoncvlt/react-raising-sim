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
    case "DO_WORK": {
      const { success, job } = action.payload;
      const { stats, pay } = job;
      const newStats = Object.keys(stats).reduce((total, stat) => {
        total[stat] = state.stats[stat] + stats[stat];
        return total;
      }, {});
      return {
        ...state,
        money: success ? state.money + pay : state.money,
        stats: { ...state.stats, ...newStats }
      };
    }
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
