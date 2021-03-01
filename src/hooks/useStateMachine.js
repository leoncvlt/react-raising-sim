import { useState } from "react";

export const useStateMachine = (initialState, initialProps) => {
  const [state, setState] = useState({
    name: initialState,
    props: initialProps
  });

  const _onStateEnter = {};
  const _onStateExit = {};

  const changeState = (name, props = {}) => {
    setState((prevState) => {
      if (prevState.name && prevState.name in _onStateExit) {
        for (const callback of _onStateExit[prevState]) {
          callback({ from: prevState.name, to: name, ...props });
        }
      }

      if (name in _onStateEnter) {
        for (const callback of _onStateEnter[name]) {
          callback({ from: prevState.name, to: name, ...props });
        }
      }

      return { name, props };
    });
  };

  const onStateEnter = (name, callback) => {
    if (_onStateEnter[name] == null || _onStateEnter.length === 0) {
      _onStateEnter[name] = [];
    }
    _onStateEnter[name].push(callback);
  };

  const onStateExit = (name, callback) => {
    if (_onStateExit[name] == null || _onStateExit.length === 0) {
      _onStateExit[name] = [];
    }
    _onStateExit[name].push(callback);
  };

  return { state, changeState, onStateEnter, onStateExit };
};
