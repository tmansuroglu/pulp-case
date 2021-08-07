import { Bodies } from "matter-js";
import { MID_POINT_X } from "./utils/common";

const CIRCLE_X = MID_POINT_X;
const CIRCLE_Y = 100;
const RADIUS = 30;

const circle = Bodies.circle(CIRCLE_X, CIRCLE_Y, RADIUS, {
  density: 1,
});

export default circle;
