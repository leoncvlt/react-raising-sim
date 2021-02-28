import { useEffect, useState } from "react";

import AdventureScene from "../../scenes/AdventureScene";
import ChatSubScene from "../../scenes/ChatSubScene";
import ManagementScene from "../../scenes/ManagementScene";
import { StatsSubScene } from "../../scenes/StatsSubScene";
import WorkSubScene from "../../scenes/WorkSubScene";

const SCENES = {
  ManagementScene: ManagementScene,
  ChatSubScene: ChatSubScene,
  AdventureScene: AdventureScene,
  WorkSubScene: WorkSubScene,
  StatsSubScene: StatsSubScene
};

const GameScene = ({ scene, onOpen, onClose, ...rest }) => {
  // a GameScene can recursively hold another scene inside it as a subscene.
  // a subscene can be opened asynchronously , or, since it returns a promise
  // that is resolved when the subscene is clodes, can be awaited / chained.
  const [subScene, setSubscene] = useState({ id: null, props: {} });
  const openSubScene = (id, props) =>
    new Promise((resolve) => {
      setSubscene({
        id,
        props: {
          ...props,
          onClose: () => {
            onClose && onClose();
            resolve();
          }
        }
      });
    });

  // on changing scene or mounting / unmounting
  // call the onOpen / onClose methods if defined
  useEffect(() => {
    onOpen && onOpen();
    return onClose;
  }, [scene]);

  const Scene = SCENES[scene];
  return (
    <>
      <Scene
        openSubScene={openSubScene}
        closeSubScene={() => openSubScene(null, {})}
        {...rest}
      />
      {subScene.id && (
        <div
          className="flex items-center justify-center absolute left-0 top-0 w-screen h-screen z-10 bg-white bg-opacity-25"
          style={{ backdropFilter: "blur(1px)" }}
        >
          <GameScene
            scene={subScene.id}
            close={() => openSubScene(null, {})}
            {...subScene.props}
          />
        </div>
      )}
    </>
  );
};

const SceneManager = ({ initialScene }) => {
  const [currentScene, setCurrentScene] = useState({
    id: initialScene,
    props: {}
  });
  const changeScene = (id, props) => setCurrentScene({ id, props });
  return (
    <GameScene
      scene={currentScene.id}
      changeScene={changeScene}
      {...currentScene.props}
    />
  );
};

export default SceneManager;
