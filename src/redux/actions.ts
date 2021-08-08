// import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import actions from "./types";
// eslint-disable-next-line
import { createdRunner } from "../components/Playground";
// import { LocalState } from "./reducers";

// export const pauseGameStarted = () => ({
//   type: actions.PAUSE_GAME_START,
//   payload: "",
// });

export const pauseGame = () => {
  createdRunner.enabled = false;
  return {
    type: actions.PAUSE_GAME_SUCCESS,
    payload: true,
  };
};

// export const pauseGameFailed = (error: string) => ({
//   type: actions.PAUSE_GAME_FAILURE,
//   payload: error,
// });

// export const handleGamePause = function () {
//   console.log("hey");
//   return () =>
//     (dispatch: ThunkDispatch<LocalState, void, AnyAction>): void => {
//       dispatch(pauseGameSuccess());
//     };
// };

// export const unpauseGameStarted = () => ({
//   type: actions.UNPAUSE_GAME_START,
//   payload: "",
// });

export const unpauseGame = () => {
  createdRunner.enabled = true;
  return {
    type: actions.UNPAUSE_GAME_SUCCESS,
    payload: false,
  };
};

// export const unpauseGameFailed = (error: string) => ({
//   type: actions.UNPAUSE_GAME_FAILURE,
//   payload: error,
// });

// export const beginSimulatingStart = () => ({
//   type: actions.BEGIN_SIMULATING_START,
//   payload: "",
// });

export const beginSimulating = () => ({
  type: actions.BEGIN_SIMULATING_SUCCESS,
  payload: true,
});

// export const beginSimulatingFailed = (error: string) => ({
//   type: actions.BEGIN_SIMULATING_FAILURE,
//   payload: error,
// });

// export const stopSimulatingStart = () => ({
//   type: actions.STOP_SIMULATING_START,
//   payload: "",
// });

export const stopSimulating = () => ({
  type: actions.STOP_SIMULATING_SUCCESS,
  payload: false,
});

// export const stopSimulatingFailed = (error: string) => ({
//   type: actions.STOP_SIMULATING_FAILURE,
//   payload: error,
// });

export const setRightSideTotalWeight = (weight: number) => ({
  type: actions.SET_RIGHT_SIDE_TOTAL_WEIGHT,
  payload: weight,
});

export const setLeftSideTotalWeight = (weight: number) => ({
  type: actions.SET_LEFT_SIDE_TOTAL_WEIGHT,
  payload: weight,
});

export const setRightSideKGM = (kgm: number) => ({
  type: actions.SET_RIGHT_SIDE_KGM,
  payload: kgm,
});

export const setLeftSideKGM = (kgm: number) => ({
  type: actions.SET_LEFT_SIDE_KGM,
  payload: kgm,
});

export const setLeftSideItemWeight = (weight: number) => ({
  type: actions.SET_LEFT_SIDE_ITEM_WEIGHT,
  payload: weight,
});
