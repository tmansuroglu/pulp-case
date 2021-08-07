import { Bodies } from "matter-js";
import { MID_POINT_X, BASE_BOARD_ID } from "./utils/common";
import baseTriangle from "./baseTriangle";

export const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 1000;
const BOARD_X = MID_POINT_X;
const BOARD_Y = baseTriangle.bounds.min.y;

const baseBoard = Bodies.rectangle(
  BOARD_X,
  BOARD_Y,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  {
    id: BASE_BOARD_ID,
    inverseInertia: Infinity,
  }
);

export default baseBoard;
