import { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import App from "./App";
import { GameProvider } from "./context/GameContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>,
  rootElement
);
