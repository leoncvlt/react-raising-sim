import Dialogue from "../components/logic/Dialogue";
import { useLifecycle } from "../hooks/useLifecycle";

const ChatSubScene = ({ dialogue, close }) => {
  useLifecycle({
    onMount: () => console.log("on mount"),
    onUnmount: () => console.log("on unnount")
  });

  return (
    <div className="flex flex-col">
      <Dialogue dialogue={dialogue} onEnd={close} />
    </div>
  );
};

export default ChatSubScene;
