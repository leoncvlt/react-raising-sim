import { isEmpty, isObject, isString } from "lodash";
import { useState } from "react";
import { useLifecycle } from "../../hooks/useLifecycle";

const DialogueParser = ({ dialogue, onEnd, render }) => {
  const [currentBlock, setCurrentBlock] = useState({ block: {}, index: 0 });
  const [currentText, setCurrentText] = useState("");
  const [currentChoices, setCurrentChoices] = useState([]);

  const parse = (block, index = 0) => {
    setCurrentChoices([]);
    setCurrentBlock({ block, index });
    const step = block[index];

    if (isString(step)) {
      setCurrentText(step);
      return;
    }

    if (isObject(step)) {
      const command = Object.keys(step)[0];
      const args = step[command];

      switch (command) {
        case "$choice":
          const choices = Object.keys(args).map((choice) => {
            const choiceBlock = args[choice];
            return {
              key: choice,
              text: choice,
              onPicked: () => parse(choiceBlock)
            };
          });
          setCurrentChoices(choices);
          return;

        case "$goto":
          const targetBlock = args;
          if (args in dialogue) {
            parse(dialogue[targetBlock]);
          } else {
            throw new Error(`No block named in ${targetBlock} in dialogue`);
          }
          return;

        default:
          throw new Error("Unknown choice!");
      }
    }

    onEnd && onEnd();
  };

  useLifecycle({
    onMount: () => parse(dialogue.start)
  });

  const advance = () => {
    if (!isEmpty(currentChoices)) return;
    parse(currentBlock.block, currentBlock.index + 1);
  };

  return render({ text: currentText, choices: currentChoices, advance });
};

export default DialogueParser;
