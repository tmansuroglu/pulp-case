import { Bodies } from "matter-js";
import { catapultHorizontalStick, CATAPULT_WIDTH } from "../shapes/catapult";
import { MID_POINT_X } from "./common";

const MIN_LEFT_SIDE_X = MID_POINT_X - CATAPULT_WIDTH / 2;
const MAX_RIGHT_SIDE_X = MID_POINT_X + CATAPULT_WIDTH / 2;
const DENSITY_COEFFICIENT = 100000;
const VERTICES_COEFFICIENT = 50000;

export const decideShape = (): "circle" | "rectangle" | "trapezoid" => {
  const shapeOptions: ["circle", "rectangle", "trapezoid"] = [
    "circle",
    "rectangle",
    "trapezoid",
  ];
  return shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
};

export const decideDensity = () => Math.round(Math.random() * 100);

export const getRandomXForRightSide = () =>
  Math.random() * (MAX_RIGHT_SIDE_X + 20 - MID_POINT_X) + MID_POINT_X;

export const getRandomXForLeftSide = () =>
  Math.random() * (MID_POINT_X - 20 - MIN_LEFT_SIDE_X) + MIN_LEFT_SIDE_X;

export const createRandomObject = (
  side: "left" | "right",
  isGameSimulating: boolean
) => {
  // density ranges between 0 and 1. density 1 causes glitches
  const density = decideDensity() / DENSITY_COEFFICIENT;
  const shape = decideShape();
  const randomX =
    side === "right" ? getRandomXForRightSide() : getRandomXForLeftSide();
  const YValue =
    side === "right"
      ? catapultHorizontalStick.bounds.min.y - 35
      : catapultHorizontalStick.bounds.min.y - 200;
  const vertices = density * VERTICES_COEFFICIENT;
  let object;
  const isStatic = !isGameSimulating && side !== "right";
  if (shape === "trapezoid") {
    object = Bodies.trapezoid(randomX, YValue, vertices, vertices, 1, {
      density,
      isStatic,
    });
  } else if (shape === "circle") {
    object = Bodies.circle(randomX, YValue, vertices / 1.2, {
      density,
      isStatic,
    });
  } else {
    object = Bodies.rectangle(randomX, YValue, vertices, vertices, {
      density,
      isStatic,
    });
  }
  return object;
};

export const calculateKgM = (objectDensity: number, objectX: number) => {
  const objectWeight = (objectDensity * DENSITY_COEFFICIENT) / 10;
  const distanceFromCenterInPx = Math.abs(MID_POINT_X - objectX);
  const oneMeterInPx = CATAPULT_WIDTH / 10;
  const distanceFromCenterInMt = distanceFromCenterInPx / oneMeterInPx;
  const kgM = objectWeight * distanceFromCenterInMt;

  return kgM;
};
