import { AnyAction } from "@reduxjs/toolkit";
import types from "./types";

export interface LocalState {
  isGamePaused: boolean;
  isGameSimulating: boolean;
  error: string;
  rightSideKgm: number;
  leftSideKgm: number;
  rightSideTotalWeight: number;
  leftSideItemWeight: number;
  leftSideTotalWeight: number;
}

const INITIAL_STATE: LocalState = {
  isGamePaused: false,
  isGameSimulating: false,
  error: "",
  rightSideKgm: 0,
  leftSideKgm: 0,
  rightSideTotalWeight: 0,
  leftSideItemWeight: 0,
  leftSideTotalWeight: 0,
};

const playgroundReducers = (
  state = INITIAL_STATE,
  action: AnyAction
): LocalState => {
  switch (action.type) {
    // case types.BEGIN_SIMULATING_START:
    //   return {
    //     ...state,
    //     error: "",
    //   };
    case types.BEGIN_SIMULATING_SUCCESS:
      return {
        ...state,
        isGameSimulating: true,
      };
    // case types.BEGIN_SIMULATING_FAILURE:
    //   return {
    //     ...state,
    //     // eslint-disable-next-line
    //     error: action.payload,
    //   };
    // case types.STOP_SIMULATING_START:
    //   return {
    //     ...state,
    //     error: "",
    //   };
    // case types.STOP_SIMULATING_FAILURE:
    //   return {
    //     ...state,
    //     // eslint-disable-next-line
    //     error: action.payload,
    //   };
    case types.STOP_SIMULATING_SUCCESS:
      return {
        ...state,
        isGameSimulating: false,
      };
    // case types.PAUSE_GAME_START:
    //   return {
    //     ...state,
    //     error: "",
    //   };
    case types.PAUSE_GAME_SUCCESS:
      return {
        ...state,
        isGamePaused: true,
      };
    // case types.PAUSE_GAME_FAILURE:
    //   return {
    //     ...state,
    //     // eslint-disable-next-line
    //     error: action.payload,
    //   };
    // case types.UNPAUSE_GAME_START:
    //   return {
    //     ...state,
    //     error: "",
    //   };
    case types.UNPAUSE_GAME_SUCCESS:
      return {
        ...state,
        isGamePaused: false,
      };
    // case types.UNPAUSE_GAME_FAILURE:
    //   return {
    //     ...state,
    //     // eslint-disable-next-line
    //     error: action.payload,
    //   };
    case types.SET_RIGHT_SIDE_KGM:
      return {
        ...state,
        // eslint-disable-next-line
        rightSideKgm: action.payload,
      };
    case types.SET_LEFT_SIDE_KGM:
      return {
        ...state,
        // eslint-disable-next-line
        leftSideKgm: state.leftSideKgm + action.payload,
      };
    case types.SET_LEFT_SIDE_ITEM_WEIGHT:
      return {
        ...state,
        // eslint-disable-next-line
        leftSideItemWeight: action.payload,
      };
    case types.SET_RIGHT_SIDE_TOTAL_WEIGHT:
      return {
        ...state,
        // eslint-disable-next-line
        rightSideTotalWeight: state.rightSideTotalWeight + action.payload,
      };
    case types.SET_LEFT_SIDE_TOTAL_WEIGHT:
      return {
        ...state,
        // eslint-disable-next-line
        leftSideTotalWeight: state.leftSideTotalWeight + action.payload,
      };
    default:
      return state;
  }
};

export default playgroundReducers;
