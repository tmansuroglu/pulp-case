import { Bodies } from "matter-js";
import {
  MID_POINT_X,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  GROUND_ID,
} from "./utils/common";

const GROUND_WIDTH = SCREEN_WIDTH;
export const GROUND_HEIGHT = 10;
const GROUND_X = MID_POINT_X;
const GROUND_Y = SCREEN_HEIGHT;

const ground = Bodies.rectangle(
  GROUND_X,
  GROUND_Y,
  GROUND_WIDTH,
  GROUND_HEIGHT,
  {
    isStatic: true,
    id: GROUND_ID,
  }
);

export default ground;
