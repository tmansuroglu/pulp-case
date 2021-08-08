import React, { FC, MouseEventHandler, ReactElement } from "react";
import "./index.css";
import { connect } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { LocalState } from "../../redux/reducers";
import {
  pauseGame as handlePauseGame,
  unpauseGame as handleUnpauseGame,
  beginSimulating as handleBeingSimulate,
  stopSimulating as handleStopSimulate,
} from "../../redux/actions";

interface PropTypes {
  reduxState: LocalState;
  pauseGame: MouseEventHandler;
  unpauseGame: MouseEventHandler;
  beginSimulating: MouseEventHandler;
  stopSimulating: MouseEventHandler;
}

const ControlBar: FC<PropTypes> = ({
  reduxState,
  pauseGame,
  unpauseGame,
  beginSimulating,
  stopSimulating,
}: PropTypes): ReactElement => (
  <div className="controlbar-container">
    <button
      type="button"
      onClick={reduxState.isGameSimulating ? stopSimulating : beginSimulating}
    >
      {reduxState.isGameSimulating
        ? "Reset & Stop simulating"
        : "Reset & Start simulating"}
    </button>
    <button
      type="button"
      onClick={reduxState.isGamePaused ? unpauseGame : pauseGame}
    >
      {reduxState.isGamePaused ? "Continue Playing" : "Pause Game"}
    </button>
  </div>
);

const mapStateToProps = (reduxState: RootState) => ({
  reduxState: reduxState.playgroundState,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => ({
  pauseGame: () => dispatch(handlePauseGame()),
  unpauseGame: () => dispatch(handleUnpauseGame()),
  beginSimulating: () => dispatch(handleBeingSimulate()),
  stopSimulating: () => dispatch(handleStopSimulate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
