import Dialogue from "../components/logic/Dialogue";
import { useStateMachine } from "../hooks/useStateMachine";
import { useGameState } from "../hooks/useGameState";

import { useEffect, useState } from "react";
import MessageBox from "../components/ui/MessageBox";
import { useTask } from "../hooks/useTask";
import Stat from "../components/ui/Stat";

const WorkSubScene = ({ job, close }) => {
  const { dispatch } = useGameState();

  const {
    currentState: sceneState,
    changeState,
    onStateEnter
  } = useStateMachine("introduction");

  const { currentRound, startTask } = useTask({
    rounds: 7,
    interval: 500,
    onTask: (total) => {
      dispatch({ type: "CHANGE_MONEY", payload: { value: job.money } });
      total["money"] = total["money"] + job.money || job.money;
      Object.keys(job.stats).forEach((stat) => {
        dispatch({
          type: "CHANGE_STAT",
          payload: { stat, value: job.stats[stat] }
        });
        total[stat] = total[stat] + job.stats[stat] || job.stats[stat];
      });
    },
    onDone: (total) => {
      changeState("finished");
    }
  });

  onStateEnter("working", () => startTask());

  const SceneElements = ({ currentRound, changeState }) => {
    switch (sceneState) {
      case "introduction":
        return (
          <Dialogue
            dialogue={{ start: [job.introduction] }}
            onEnd={() => changeState("working")}
          />
        );
      case "working":
        return (
          <div className="flex flex-col">
            {Object.keys(job.stats).map((stat) => (
              <Stat key={stat} stat={stat} />
            ))}
            <br />
            <MessageBox>Working... ({currentRound + 1} / 7)</MessageBox>
          </div>
        );
      case "finished":
        return (
          <Dialogue
            dialogue={{ start: ["Thanks for your hard work!"] }}
            onEnd={close}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <SceneElements currentRound={currentRound} changeState={changeState} />
  );
};

export default WorkSubScene;
