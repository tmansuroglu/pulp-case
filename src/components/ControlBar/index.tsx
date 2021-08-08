import React, { FC, MouseEventHandler, ReactElement } from "react";
import "./index.css";
import { connect } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { LocalState } from "../../redux/reducers";
import {
  pauseGame as handlePauseGame,
  unpauseGame as handleUnpauseGame,
} from "../../redux/actions";

interface PropTypes {
  isSimulating: boolean;
  setIsSimulating: MouseEventHandler;
  reduxState: LocalState;
  pauseGame: MouseEventHandler;
  unpauseGame: MouseEventHandler;
}

const ControlBar: FC<PropTypes> = ({
  isSimulating,
  setIsSimulating,
  reduxState,
  pauseGame,
  unpauseGame,
}: PropTypes): ReactElement => (
  <div className="controlbar-container">
    <button onClick={setIsSimulating} type="button">
      {isSimulating ? "Turn off auto-simulate" : "Turn on auto-simulate"}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
