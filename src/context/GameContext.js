import React, { useReducer, useEffect } from "react";

export const GameContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "increment_money":
      return { ...state, money: state.money + 1 };
    default:
      throw new Error("Unknown reducer action");
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { money: 0, day: 1 });

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
