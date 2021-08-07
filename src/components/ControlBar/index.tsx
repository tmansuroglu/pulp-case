import React, { FC, MouseEventHandler, ReactElement } from "react";
import "./index.css";

interface PropTypes {
  isSimulating: boolean;
  setIsSimulating: MouseEventHandler;
}

const ControlBar: FC<PropTypes> = ({
  isSimulating,
  setIsSimulating,
}: PropTypes): ReactElement => (
  <div className="controlbar-container">
    <button onClick={setIsSimulating} type="button">
      {isSimulating ? "Turn off auto-simulate" : "Turn on auto-simulate"}
    </button>
  </div>
);

export default ControlBar;
