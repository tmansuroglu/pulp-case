import { Bodies, Body, Constraint, Vector } from "matter-js";
import { MID_POINT_X, SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils/common";
import ground from "./ground";

const GROUND_MIN_Y = ground.bounds.min.y;

const CATAPULT_HEIGHT = 80;
export const CATAPULT_WIDTH = SCREEN_WIDTH < 600 ? 300 : 500;
const CATAPULT_BOARD_HEIGHT = 20;
const CATAPULT_Y = GROUND_MIN_Y - CATAPULT_HEIGHT / 2;

const VERTICAL_STICK_WIDTH = 20;
const VERTICAL_STICK_HEIGHT = 80;

const HORIZONTAL_STICK_WIDTH = 20;
const HORIZONTAL_STICK_HEIGHT = 80;

const HOLDER_HEIGHT = 55;
const HOLDER_WIDTH = 20;

export const HOLDER_X = MID_POINT_X + CATAPULT_WIDTH / 2 - HOLDER_WIDTH / 2;

const RIGHT_BLOCKER_X = HOLDER_X + 25;
const RIGHT_BLOCKER_WIDTH = 20;
const RIGHT_BLOCKER_HEIGHT = SCREEN_HEIGHT;

const LEFT_BLOCKER_WIDTH = 20;
const LEFT_BLOCKER_X =
  MID_POINT_X - CATAPULT_WIDTH / 2 - LEFT_BLOCKER_WIDTH / 2 - 5;
const LEFT_BLOCKER_HEIGHT = SCREEN_HEIGHT;

// add bodies
const group = Body.nextGroup(true);

export const catapult = Bodies.rectangle(
  MID_POINT_X,
  CATAPULT_Y - 30,
  CATAPULT_WIDTH,
  CATAPULT_BOARD_HEIGHT,
  {
    collisionFilter: { group },
  }
);

// vertical and horizontal stick names are wrong
export const catapultVerticalStick = Bodies.rectangle(
  MID_POINT_X,
  CATAPULT_Y,
  VERTICAL_STICK_WIDTH,
  VERTICAL_STICK_HEIGHT,
  {
    isStatic: true,
    collisionFilter: { group },
    render: { fillStyle: "#060a19" },
  }
);

export const catapultHorizontalStick = Bodies.rectangle(
  MID_POINT_X,
  CATAPULT_Y,
  HORIZONTAL_STICK_WIDTH,
  HORIZONTAL_STICK_HEIGHT,
  {
    isStatic: true,
    collisionFilter: { group },
    render: { fillStyle: "#060a19" },
    friction: 1,
  }
);

export const catapultConnector = Constraint.create({
  bodyA: catapult,
  pointB: Vector.clone(catapult.position),
  stiffness: 1,
  length: 0,
});

export const rightSideHolder = Bodies.rectangle(
  HOLDER_X,
  GROUND_MIN_Y - HOLDER_HEIGHT / 2,
  HOLDER_WIDTH,
  HOLDER_HEIGHT,
  {
    isStatic: true,
    density: 1,
    render: { fillStyle: "#060a19" },
  }
);

export const rightSideBlocker = Bodies.rectangle(
  RIGHT_BLOCKER_X,
  GROUND_MIN_Y - RIGHT_BLOCKER_HEIGHT / 2,
  RIGHT_BLOCKER_WIDTH,
  RIGHT_BLOCKER_HEIGHT,
  {
    isStatic: true,
    density: 1,
    render: { fillStyle: "#060a19", visible: true },
  }
);

export const leftSideBlocker = Bodies.rectangle(
  LEFT_BLOCKER_X,
  GROUND_MIN_Y - LEFT_BLOCKER_HEIGHT / 2,
  LEFT_BLOCKER_WIDTH,
  LEFT_BLOCKER_HEIGHT,
  {
    isStatic: true,
    density: 1,
    render: { fillStyle: "#060a19", visible: true },
  }
);
