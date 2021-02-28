import { isEmpty } from "lodash";

import DialogueParser from "./DialogueParser";

import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";

const Dialogue = ({ dialogue, onEnd }) => {
  return (
    <div className="flex flex-col">
      <DialogueParser
        dialogue={dialogue}
        onEnd={onEnd}
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

export default Dialogue;
