import { useGameState } from "../../hooks/useGameState";

const Stat = ({ stat }) => {
  const { state } = useGameState();
  const value = state.stats[stat];
  return (
    <div className="flex bg-black text-white px-2 py-1 my-1 border">
      <span className="w-32">{stat}</span>
      <span className="w-10 text-right">{value}</span>
    </div>
  );
};

export default Stat;
