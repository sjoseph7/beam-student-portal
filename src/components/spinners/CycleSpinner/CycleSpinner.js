import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => (
  <Fragment>
    {/* TODO: Refactor style into module.css */}
    <img src={spinner} style={{ width: "100px" }} alt="Loading..." />
  </Fragment>
);
