import { Constraint } from "matter-js";
import baseBoard from "./baseBoard";
import { TRIANGLE_WIDTH } from "./baseTriangle";
import ground from "./ground";

const rightConstraint = Constraint.create({
  bodyA: baseBoard,
  bodyB: ground,
  pointB: { x: TRIANGLE_WIDTH / 2, y: 0 },
  stiffness: 1,
  damping: 0,
});

export default rightConstraint;
