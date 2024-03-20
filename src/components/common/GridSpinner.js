import React from "react";
import { Grid } from "react-loader-spinner";

function GridSpinner({ visible, style }) {
  return (
    <Grid
      visible={visible}
      height="40"
      width="40"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={style}
      wrapperClass="grid-wrapper"
    />
  );
}

export default GridSpinner;
