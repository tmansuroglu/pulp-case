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

    const rightSideHolder = Bodies.rectangle(550, 555, 20, 50, {
      isStatic: true,
      density: 1,
      render: { fillStyle: "#060a19" },
    });

    const rightSideBlocker = Bodies.rectangle(575, 400, 20, 300, {
      isStatic: true,
      density: 1,
      render: { fillStyle: "#060a19", visible: false },
    });

    const decideShape = (): "circle" | "rectangle" | "trapezoid" => {
      const shapeOptions: ["circle", "rectangle", "trapezoid"] = [
        "circle",
        "rectangle",
        "trapezoid",
      ];
      return shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
    };

    const decideDensity = () => Math.round(Math.random() * 100) / 100;

    const getRandomXForRightSide = () => Math.random() * (560 - 450) + 450;

    // const getRandomXForLeftSide = () => {
    //   return Math.random() * (450 - 210) + 210;
    // };

    const createRandomObject = () => {
      const density = decideDensity() / 1000;
      const shape = decideShape();
      const randomX = getRandomXForRightSide();
      const YValue = catapultHorizontalStick.bounds.min.y;
      const vertices = density * 70000;
      let object;
      if (shape === "trapezoid") {
        object = Bodies.trapezoid(randomX, YValue, vertices, vertices, 1, {
          density,
        });
      } else if (shape === "circle") {
        object = Bodies.circle(randomX, YValue, vertices, {
          density,
        });
      } else {
        object = Bodies.rectangle(randomX, YValue, vertices, vertices, {
          density,
        });
      }
      return object;
    };

    const randomRightSideObject = createRandomObject();
    createRandomObject();

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
      max: { x: 800, y: 600 },
    });

    return () => {
      render.canvas.remove();
    };
  }, []);
  return <div ref={playgroundRef} className="playground" />;
};

export default Playground;
