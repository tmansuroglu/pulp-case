import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import { Engine, Render, Runner, Composite, Events } from "matter-js";
import { createRandomObject, calculateKgM } from "../../utils/utils";
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
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // create engine
    const engine = Engine.create();
    const { world } = engine;

    // create runner
    const runner = Runner.create();
    const createdRunner = Runner.run(runner, engine);
    createdRunner.enabled = true;

    const render = Render.create({
      element: playgroundRef.current,
      engine,
      options: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      },
    });

    Render.run(render);

    const randomRightSideObject = createRandomObject("right");

    const randomLeftSideObject = createRandomObject("left");

    Composite.add(world, [
      catapult,
      ground,
      catapultVerticalStick,
      catapultHorizontalStick,
      catapultConnector,
      rightSideHolder,
      randomRightSideObject,
      randomLeftSideObject,
      rightSideBlocker,
    ]);

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: SCREEN_WIDTH, y: SCREEN_HEIGHT },
    });

    const eventCallback = () => {
      const catapultAngle = Math.abs(catapult.angle) * 100;
      const rightSideKgm = calculateKgM(
        randomRightSideObject.density,
        randomRightSideObject.position.x
      );

      const leftSideKgm = calculateKgM(
        randomLeftSideObject.density,
        randomLeftSideObject.position.x
      );

      if (catapultAngle > 30 || Math.abs(rightSideKgm - leftSideKgm) >= 20) {
        setIsGameOver(true);
        createdRunner.enabled = false;
        console.log(isGameOver);
      }
    };
    Events.on(engine, "afterUpdate", eventCallback);

    return () => {
      render.canvas.remove();
      createdRunner.enabled = true;
      Events.off(engine, "afterUpdate", eventCallback);
    };
  }, []);

  return <div className="playground" ref={playgroundRef} />;
};

export default Playground;
