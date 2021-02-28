import Button from "../components/ui/Button";
import Stat from "../components/ui/Stat";
import { useGameState } from "../hooks/useGameState";

export const StatsSubScene = ({ close }) => {
  const { state } = useGameState();
  return (
    <div className="flex flex-col">
      {Object.keys(state.stats).map((stat) => (
        <Stat key={stat} stat={stat} />
      ))}
      <Button onClick={close}>Back</Button>
    </div>
  );
};
