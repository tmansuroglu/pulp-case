import React, { FC, ReactElement, useEffect, useRef } from "react";
import "./index.css";
import {
  Engine,
  Render,
  Runner,
  Composite,
  Constraint,
  Vector,
  Body,
  Bodies,
} from "matter-js";

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
        width: 800,
        height: 600,
      },
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    const group = Body.nextGroup(true);

    const catapult = Bodies.rectangle(400, 520, 320, 20, {
      collisionFilter: { group },
    });

    const ground = Bodies.rectangle(400, 600, 800, 50.5, {
      isStatic: true,
      render: { fillStyle: "#060a19" },
    });

    const catapultVerticalStick = Bodies.rectangle(400, 535, 20, 80, {
      isStatic: true,
      collisionFilter: { group },
      render: { fillStyle: "#060a19" },
    });

    const catapultHorizontalStick = Bodies.rectangle(400, 535, 20, 80, {
      isStatic: true,
      collisionFilter: { group },
      render: { fillStyle: "#060a19" },
      friction: 1,
    });

    const catapultConnector = Constraint.create({
      bodyA: catapult,
      pointB: Vector.clone(catapult.position),
      stiffness: 1,
      length: 0,
    });

    const invisibleRightSideBlocker = Bodies.rectangle(573, 325, 20, 500, {
      isStatic: true,
      render: { fillStyle: "#060a19", visible: false },
    });

    const invisibleLeftSideBlocker = Bodies.rectangle(225, 325, 20, 500, {
      isStatic: true,
      render: { fillStyle: "#060a19", visible: false },
    });

    const randomWeight = Bodies.circle(420, 450, 20, {
      friction: 1,
    });

    Composite.add(world, [
      // stack,
      catapult,
      ground,
      catapultVerticalStick,
      catapultHorizontalStick,
      catapultConnector,
      randomWeight,
      invisibleRightSideBlocker,
      invisibleLeftSideBlocker,
    ]);

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
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
