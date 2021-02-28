import yaml from "js-yaml";

import Clock from "../components/ui/Clock";
import Button from "../components/ui/Button";

import { useStateMachine } from "../hooks/useStateMachine";

import testDialogue from "../data/test-dialogue.yaml";
import testJob from "../data/test-job.yaml";

const ManagementScene = ({ changeScene, openSubScene }) => {
  const { currentState, changeState } = useStateMachine("idle");

  const SceneElements = function () {
    switch (currentState) {
      case "idle":
        return (
          <>
            <Button onClick={(e) => changeState("select_work")}>Work</Button>
            <Button
              onClick={async (e) => {
                await openSubScene("ChatSubScene", {
                  dialogue: yaml.load(testDialogue)
                });
                console.log("ChatSubScene closed!");
              }}
            >
              Chat
            </Button>
            <Button onClick={(e) => openSubScene("StatsSubScene")}>
              Stats
            </Button>
          </>
        );
      case "select_work":
        return (
          <>
            <Button
              onClick={(e) => {
                openSubScene("WorkSubScene", { job: yaml.load(testJob) });
                changeState("idle");
              }}
            >
              Work
            </Button>
            <Button onClick={(e) => changeState("idle")}>Back</Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-evenly">
      <Clock />
      <div className="flex flex-col">
        <SceneElements />
      </div>
    </div>
  );
};

export default ManagementScene;
