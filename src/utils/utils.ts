import { Bodies } from "matter-js";
import { catapultHorizontalStick, HOLDER_X as MAX_X } from "../shapes/catapult";
import { MID_POINT_X as MIN_X } from "./common";

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
  Math.random() * (MAX_X - MIN_X + 10) + MIN_X + 10;

export const createRandomObject = () => {
  // density ranges between 0 and 1. density 1 causes glitches
  const density = decideDensity() / 1000;
  const shape = decideShape();
  const randomX = getRandomXForRightSide();
  const YValue = catapultHorizontalStick.bounds.min.y - 25;
  console.log(density * 50000);
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
