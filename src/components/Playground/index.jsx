/* eslint-disable */
import React, { FC, ReactElement, useEffect, useRef } from "react";
import "./index.css";
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
import {
  createRandomObject,
  calculateKgM,
  DENSITY_COEFFICIENT,
} from "../../utils/utils";
import { MID_POINT_X, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/common";
import {
  catapult,
  catapultConnector,
  catapultHorizontalStick,
  catapultVerticalStick,
  rightSideBlocker,
  rightSideHolder,
  leftSideBlocker,
} from "../../shapes/catapult";
// eslint-disable-next-line
import {
  unpauseGame as handleUnpauseGame,
  pauseGame as handlePauseGame,
  setLeftSideItemWeight as handleLeftSideItemWeight,
  setLeftSideKGM as handleLeftSideKgm,
  setRightSideKGM as handleRightSideKgm,
  setRightSideTotalWeight as handleRightSideTotalWeight,
  setLeftSideTotalWeight as handleLeftSideTotalWeight,
} from "../../redux/actions";
import ground from "../../shapes/ground";
import { RootState } from "../../redux/store";
import { LocalState } from "../../redux/reducers";

// create engine
export const engine = Engine.create();
export const { world } = engine;

// create runner
const runner = Runner.create();
export const createdRunner = Runner.run(runner, engine);

// interface PropTypes {
//   reduxState: LocalState;
//   unpauseGame: Function;
//   pauseGame: Function;

//   setLeftSideKgm: Function;
//   setRightSideKgm: Function;
//   setRightSideTotalWeight: Function;
//   // setLeftSideTotalWeight: Function;
//   setLeftSideItemWeight: Function;
// }

const Playground = ({
  reduxState,
  unpauseGame,
  pauseGame,

  setLeftSideKgm,
  setRightSideKgm,
  setRightSideTotalWeight,
  setLeftSideItemWeight,
}) => {
  // eslint-disable-next-line
  const playgroundRef = useRef(null);

  let randomLeftSideObject = createRandomObject("left", true);

  // setLeftSideTotalWeight(
  //   randomLeftSideObject.density * DENSITY_COEFFICIENT * 100
  // );

  useEffect(() => {
    setLeftSideItemWeight(
      (randomLeftSideObject.density * DENSITY_COEFFICIENT) / 10
    );
    unpauseGame();
    const render = Render.create({
      // eslint-disable-next-line
      element: playgroundRef.current,
      engine,
      options: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      },
    });

    Render.run(render);

    const randomRightSideObject = createRandomObject("right", false);

    const rightSideKgm = calculateKgM(
      randomRightSideObject.density,
      randomRightSideObject.position.x
    );

    if (rightSideKgm !== Infinity) {
      setRightSideKgm(rightSideKgm);
    }
    setRightSideTotalWeight(
      (randomRightSideObject.density * DENSITY_COEFFICIENT) / 10
    );

    const leftSideKgm = calculateKgM(
      randomLeftSideObject.density,
      randomLeftSideObject.position.x
    );

    setLeftSideKgm(leftSideKgm);

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
      leftSideBlocker,
    ]);

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: SCREEN_WIDTH, y: SCREEN_HEIGHT },
    });

    const eventCallback = () => {
      const catapultAngle = Math.abs(catapult.angle) * 100;
      if (catapultAngle > 30) {
        pauseGame();
        alert("Game Over");
      }

      const otherBodies = [];
      world.bodies.forEach((body) => {
        if (
          body.id !== randomLeftSideObject.id &&
          body.id !== leftSideBlocker.id &&
          body.id !== rightSideBlocker.id
        ) {
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

          setLeftSideItemWeight(
            (randomLeftSideObject.density * DENSITY_COEFFICIENT) / 10
          );

          Composite.add(world, randomLeftSideObject);
        }
      });
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
        const newX = oldPosition.x - 5;
        Body.set(randomLeftSideObject, "position", {
          ...oldPosition,
          x: leftSideBlocker.bounds.max.x + 10 > newX ? oldPosition.x : newX,
        });
      } else if (e.key === "ArrowRight") {
        const newX = oldPosition.x + 5;
        Body.set(randomLeftSideObject, "position", {
          ...oldPosition,
          x: MID_POINT_X - 35 < newX ? oldPosition.x : newX,
        });
      } else if (e.key === "ArrowDown") {
        Body.set(randomLeftSideObject, "position", {
          ...oldPosition,
          y: oldPosition.y + 5,
        });
      }
    });
  }, [reduxState.isGameSimulating]);

  // eslint-disable-next-line
  return <div className="playground" ref={playgroundRef} />;
};

const mapStateToProps = (reduxState) => ({
  reduxState: reduxState.playgroundState,
});

const mapDispatchToProps = (dispatch) => ({
  unpauseGame: () => dispatch(handleUnpauseGame()),
  pauseGame: () => dispatch(handlePauseGame()),
  setLeftSideItemWeight: (weight) => dispatch(handleLeftSideItemWeight(weight)),
  setLeftSideKgm: (kgm) => dispatch(handleLeftSideKgm(kgm)),
  setRightSideKgm: (kgm) => dispatch(handleRightSideKgm(kgm)),
  setLeftSideTotalWeight: (weight) =>
    dispatch(handleLeftSideTotalWeight(weight)),
  setRightSideTotalWeight: (weight) =>
    dispatch(handleRightSideTotalWeight(weight)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
