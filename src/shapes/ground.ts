import { Bodies } from "matter-js";
import { MID_POINT_X, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/common";

const GROUND_HEIGHT = SCREEN_HEIGHT / 10;

const ground = Bodies.rectangle(
  MID_POINT_X,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  GROUND_HEIGHT,
  {
    isStatic: true,
    render: { fillStyle: "#060a19" },
  }
);

export default ground;
