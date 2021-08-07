import React, { FC, ReactElement, useEffect, useRef } from "react";
import "./index.css";
import { Engine, Render, Runner, Composite } from "matter-js";
import { createRandomObject } from "../../utils/utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/common";
import {
  catapult,
  catapultConnector,
  catapultHorizontalStick,
  catapultVerticalStick,
  rightSideBlocker,
  rightSideHolder,
} from "../../shapes/catapult";
import ground from "../../shapes/ground";

const Playground: FC = (): ReactElement => {
  const playgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // create engine
    const engine = Engine.create();
    const { world } = engine;

    const render = Render.create({
      element: playgroundRef.current,
      engine,
      options: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      },
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    const randomRightSideObject = createRandomObject();

    Composite.add(world, [
      catapult,
      ground,
      catapultVerticalStick,
      catapultHorizontalStick,
      catapultConnector,
      rightSideHolder,
      randomRightSideObject,
      rightSideBlocker,
    ]);

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: SCREEN_WIDTH, y: SCREEN_HEIGHT },
    });

    return () => {
      render.canvas.remove();
    };
  }, []);
  return <div ref={playgroundRef} className="playground" />;
};

export default Playground;
