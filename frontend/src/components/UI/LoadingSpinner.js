import React from "react";

import classes from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={classes.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingSpinner;
