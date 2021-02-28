import { useGameState } from "../../hooks/useGameState";

const Clock = () => {
  const { state } = useGameState();
  return (
    <div className="flex flex-col p-4 bg-black text-white shadow-md border-solid border border-white">
      <p>Money: {state.money}</p>
      <p>Day: {state.day}</p>
    </div>
  );
};

export default Clock;
