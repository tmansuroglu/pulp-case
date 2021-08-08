import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import {
  Engine,
  Render,
  Runner,
  Composite,
  Events,
  Body,
  SAT,
} from "matter-js";
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
// eslint-disable-next-line
import { unpauseGame as handleUnpauseGame } from "../../redux/actions";
import ground from "../../shapes/ground";
import { RootState } from "../../redux/store";
import { LocalState } from "../../redux/reducers";

// create engine
const engine = Engine.create();
const { world } = engine;

// create runner
const runner = Runner.create();
export const createdRunner = Runner.run(runner, engine);

interface PropTypes {
  reduxState: LocalState;
  unpauseGame: Function;
}

const Playground: FC<PropTypes> = ({
  reduxState,
  unpauseGame,
}: PropTypes): ReactElement => {
  const playgroundRef = useRef<HTMLDivElement>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  let randomLeftSideObject = createRandomObject(
    "left",
    reduxState.isGameSimulating
  );

  useEffect(() => {
    const render = Render.create({
      element: playgroundRef.current,
      engine,
      options: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      },
    });

    Render.run(render);

    const randomRightSideObject = createRandomObject("right", false);

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

      const otherBodies: Body[] = [];
      world.bodies.forEach((body: Body) => {
        if (body.id !== randomLeftSideObject.id) {
          otherBodies.push(body);
        }
      });

      otherBodies.forEach((body) => {
        if (SAT.collides(randomLeftSideObject, body).collided) {
          Body.set(randomLeftSideObject, "isStatic", false);

          randomLeftSideObject = createRandomObject(
            "left",
            reduxState.isGameSimulating
          );

          Composite.add(world, randomLeftSideObject);
        }
      });

      if (catapultAngle > 30 || Math.abs(rightSideKgm - leftSideKgm) >= 20) {
        setIsGameOver(true);
        console.log(isGameOver);
      }
    };
    Events.on(engine, "afterUpdate", eventCallback);

    return () => {
      unpauseGame();
      render.canvas.remove();
      Events.off(engine, "afterUpdate", eventCallback);
    };
  }, []);

  useEffect(() => {
    if (reduxState.isGameSimulating) {
      return;
    }

    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      const oldPosition = randomLeftSideObject.position;
      if (e.key === "ArrowLeft") {
        Body.set(randomLeftSideObject, "position", {
          ...oldPosition,
          x: oldPosition.x - 5,
        });
      } else if (e.key === "ArrowRight") {
        Body.set(randomLeftSideObject, "position", {
          ...oldPosition,
          x: oldPosition.x + 5,
        });
      } else if (e.key === "ArrowDown") {
        Body.set(randomLeftSideObject, "position", {
          ...oldPosition,
          y: oldPosition.y + 5,
        });
      }
    });
  }, [reduxState.isGameSimulating]);

  return <div className="playground" ref={playgroundRef} />;
};

const mapStateToProps = (reduxState: RootState) => ({
  reduxState: reduxState.playgroundState,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => ({
  unpauseGame: () => dispatch(handleUnpauseGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
