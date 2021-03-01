import Dialogue from "../components/logic/Dialogue";
import MessageBox from "../components/ui/MessageBox";
import Stat from "../components/ui/Stat";

import { useStateMachine } from "../hooks/useStateMachine";
import { useGameState } from "../hooks/useGameState";
import { useTask } from "../hooks/useTask";

const WorkSubScene = ({ job, close }) => {
  const { dispatch } = useGameState();

  const { state: sceneState, changeState, onStateEnter } = useStateMachine(
    WorkSubScene.STATES.Introduction
  );

  const { taskResults, startTask } = useTask({
    rounds: job.rounds,
    interval: 500,
    onTask: () => {
      const success = Math.round(Math.random()) === 0;
      dispatch({ type: "DO_WORK", payload: { success, job } });
      return {
        success,
        pay: success ? job.pay : 0
      };
    },
    onDone: (results) => {
      const totalPay = taskResults.reduce((total, r) => total + r.pay, 0);
      const bonus = results.every((r) => r.success)
        ? Math.floor(totalPay * 0.5)
        : 0;
      if (bonus) {
        dispatch({ type: "CHANGE_MONEY", payload: { value: bonus } });
      }
      changeState(WorkSubScene.STATES.Finished, { totalPay, bonus });
    }
  });

  onStateEnter(WorkSubScene.STATES.Working, () => startTask());

  const SceneElements = ({ taskResults, changeState }) => {
    switch (sceneState.name) {
      case WorkSubScene.STATES.Introduction:
        return (
          <Dialogue
            dialogue={{ start: [job.introduction] }}
            onEnd={() => changeState(WorkSubScene.STATES.Working)}
          />
        );
      case WorkSubScene.STATES.Working:
        return (
          taskResults.length > 0 && (
            <div className="flex flex-col">
              {Object.keys(job.stats).map((stat) => (
                <Stat key={stat} stat={stat} />
              ))}
              <br />
              <MessageBox>
                Working... ({taskResults.length} / 7)
                <br />
                {taskResults[taskResults.length - 1].success
                  ? "Today went very well!"
                  : "Today didn't go so well..."}
              </MessageBox>
            </div>
          )
        );
      case WorkSubScene.STATES.Finished:
        const { bonus, totalPay } = sceneState.props;
        const message =
          `Work is finished. You earned ${totalPay} gold.` +
          (bonus
            ? `\nYou did very well today, so you earn a bonus of ${bonus} gold as well!`
            : ``);
        return <Dialogue dialogue={{ start: [message] }} onEnd={close} />;
      default:
        return null;
    }
  };

  return <SceneElements taskResults={taskResults} changeState={changeState} />;
};

WorkSubScene.STATES = {
  Introduction: "introduction",
  Working: "working",
  Finished: "finished"
};

export default WorkSubScene;
