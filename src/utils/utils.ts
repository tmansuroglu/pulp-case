import { Bodies } from "matter-js";
import {
  catapultHorizontalStick,
  HOLDER_X as MAX_RIGHT_SIDE_X,
  CATAPULT_WIDTH,
} from "../shapes/catapult";
import { MID_POINT_X } from "./common";

const MIN_LEFT_SIDE_X = MID_POINT_X - CATAPULT_WIDTH / 2 + 10;

export const decideShape = (): "circle" | "rectangle" | "trapezoid" => {
  const shapeOptions: ["circle", "rectangle", "trapezoid"] = [
    "circle",
    "rectangle",
    "trapezoid",
  ];
  return shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
};

export const decideDensity = () => Math.round(Math.random() * 100) / 100;

export const getRandomXForRightSide = () =>
  Math.random() * (MAX_RIGHT_SIDE_X - MID_POINT_X + 5) + MID_POINT_X + 5;

export const getRandomXForLeftSide = () =>
  Math.random() * (MID_POINT_X - MIN_LEFT_SIDE_X) + MIN_LEFT_SIDE_X;

export const createRandomObject = (side: "left" | "right") => {
  // density ranges between 0 and 1. density 1 causes glitches
  const density = decideDensity() / 1000;
  const shape = decideShape();
  const randomX =
    side === "right" ? getRandomXForRightSide() : getRandomXForLeftSide();
  const YValue =
    side === "right"
      ? catapultHorizontalStick.bounds.min.y - 25
      : catapultHorizontalStick.bounds.min.y - 200;
  const vertices = density * 50000;
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
