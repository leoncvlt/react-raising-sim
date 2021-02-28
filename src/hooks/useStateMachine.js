import { useState } from "react";

export const useStateMachine = (initialState) => {
  const [currentState, setCurrentState] = useState(initialState);
  const _onStateEnter = {};
  const _onStateExit = {};

  const changeState = (newState, props) => {
    setCurrentState((prevState) => {
      if (prevState && prevState in _onStateExit) {
        for (const callback of _onStateExit[prevState]) {
          callback({ from: prevState, to: newState, ...props });
        }
      }

      if (newState in _onStateEnter) {
        for (const callback of _onStateEnter[newState]) {
          callback({ from: prevState, to: newState, ...props });
        }
      }

      return newState;
    });
  };

  const onStateEnter = (state, callback) => {
    if (_onStateEnter[state] == null || _onStateEnter.length === 0) {
      _onStateEnter[state] = [];
    }
    _onStateEnter[state].push(callback);
  };

  const onStateExit = (state, callback) => {
    if (_onStateExit[state] == null || _onStateExit.length === 0) {
      _onStateExit[state] = [];
    }
    _onStateExit[state].push(callback);
  };

  return { currentState, changeState, onStateEnter, onStateExit };
};
