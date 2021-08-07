import { Bodies } from "matter-js";
import { MID_POINT_X, SCREEN_HEIGHT } from "./utils/common";
import { GROUND_HEIGHT } from "./ground";

const TRIANGLE_HEIGHT = 100;
export const TRIANGLE_WIDTH = 100;
const TRIANGLE_X = MID_POINT_X;
// triangle Y location refers to its center's position ???
const TRIANGLE_Y = SCREEN_HEIGHT + GROUND_HEIGHT - TRIANGLE_HEIGHT / 2;
const TRIANGLE_SLOPE = 1;

const baseTriangle = Bodies.trapezoid(
  TRIANGLE_X,
  TRIANGLE_Y,
  TRIANGLE_HEIGHT,
  TRIANGLE_WIDTH,
  TRIANGLE_SLOPE,
  { isStatic: true, id: 2 }
);

export default baseTriangle;
