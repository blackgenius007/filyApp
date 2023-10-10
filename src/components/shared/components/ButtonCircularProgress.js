import React from "react";
import { CircularProgress, Box } from "@mui/material";

const ButtonCircularProgress = (props) => {
  const { size, classes } = props;

  const circularProgressStyle = {
    color: classes.circularProgress,
  };

  return (
    <Box color="secondary.main" pl={1.5} display="flex">
      <CircularProgress
        size={size ? size : 24}
        thickness={size ? (size / 5) * 24 : 5}
        style={circularProgressStyle}
      />
    </Box>
  );
};

export default ButtonCircularProgress;
