import React, { FC, ReactElement, useEffect, useRef } from "react";
import "./index.css";
import Matter, {
  Engine,
  Render,
  Runner,
  Composite,
  Events,
  SAT,
} from "matter-js";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./utils/common";
import baseBoard from "./baseBoard";
import ground from "./ground";
import baseTriangle from "./baseTriangle";
import rightConstraint from "./rightConstraint";
import leftConstraint from "./leftConstraint";
import circle from "./circle";

// allows magnetism
Matter.use("matter-attractors");

const Playground: FC = (): ReactElement => {
  const playgroundRef = useRef<HTMLDivElement>(null);

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
    Events.on(engine, "collisionStart", () => {
      const didCircleCollide = SAT.collides(baseBoard, circle).collided;
      if (didCircleCollide) {
        circle.friction = 1;
      }
    });

    return () => {
      render.canvas.remove();
      // Events.off(engine, "collisionEnd", () => {
      //   console.log(baseBoard.angle);
      // });
    };
  }, []);
  return <div ref={playgroundRef} className="playground" />;
};

export default Playground;
