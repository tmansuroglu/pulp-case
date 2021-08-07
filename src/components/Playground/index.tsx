import React, { FC, ReactElement, useEffect, useRef } from "react";
import "./index.css";
import { Engine, Render, Runner, Composite, Events } from "matter-js";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./utils/common";
import baseBoard from "./baseBoard";
import ground from "./ground";
import baseTriangle from "./baseTriangle";
import rightConstraint from "./rightConstraint";
import leftConstraint from "./leftConstraint";
import circle from "./circle";

const Playground: FC = (): ReactElement => {
  const playgroundRef = useRef(null);

  useEffect(() => {
    // create an engine
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
      element: playgroundRef.current,
      engine,
      options: {
        hasBounds: true,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      },
    });

    // add all of the bodies to the world
    Composite.add(engine.world, [
      ground,
      baseTriangle,
      baseBoard,
      circle,
      rightConstraint,
      leftConstraint,
    ]);

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    // listen to board angle change
    Events.on(engine, "collisionEnd", () => {
      console.log(baseBoard.angle);
    });

    return () => render.canvas.remove();
  }, []);
  return <div ref={playgroundRef} className="playground" />;
};

export default Playground;
