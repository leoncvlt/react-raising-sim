import { isEmpty } from "lodash";
import DialogueParser from "../components/logic/DialogueParser";
import Button from "../components/ui/Button";
import MessageBox from "../components/ui/MessageBox";
import { useLifecycle } from "../hooks/useLifecycle";

const ChatSubScene = ({ dialogue, close }) => {
  useLifecycle({
    onMount: () => console.log("on mount"),
    onUnmount: () => console.log("on unnount")
  });

  return (
    <div className="flex flex-col">
      <DialogueParser
        dialogue={dialogue}
        onEnd={() => close()}
        render={({ text, advance, choices }) => (
          <>
            <MessageBox onClick={advance} clickable={isEmpty(choices)}>
              {text}
            </MessageBox>
            {choices.map((choice) => (
              <Button key={choice.key} onClick={choice.onPicked}>
                {choice.text}
              </Button>
            ))}
          </>
        )}
      />
    </div>
  );
};

export default ChatSubScene;
