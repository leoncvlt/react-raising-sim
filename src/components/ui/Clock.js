import { useGameState } from "../../hooks/useGameState";

const Clock = () => {
  const { state } = useGameState();
  return (
    <div className="flex flex-col w-24">
      <div className="mb-1 flex flex-col items-center p-4 bg-black text-white shadow-md border border-white">
        <p>Day</p>
        <p className="text-3xl font-bold">{state.day}</p>
      </div>
      <p className="flex justify-between px-2 py-1 bg-black text-white shadow-md border border-white">
        <span>💲</span>
        <span>{state.money}</span>
      </p>
    </div>
  );
};

export default Clock;
