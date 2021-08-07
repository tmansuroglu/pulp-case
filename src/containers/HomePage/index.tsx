import React, { FC, ReactElement } from "react";
import "./index.css";
import Playground from "../../components/Playground";
import ControlBar from "../../components/ControlBar";

const HomePage: FC = (): ReactElement => (
  <>
    <ControlBar isSimulating={false} setIsSimulating={() => "a"} />
    <Playground />
  </>
);

export default HomePage;
