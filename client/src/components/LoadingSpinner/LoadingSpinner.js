import React from "react";
import { Container, CircularProgress, Box } from "@material-ui/core";
import { useStyles } from "./LoadingSpinner.styles";

export default function LoadingSpinner() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.spinnerContainer}
      >
        <CircularProgress color="secondary" />
      </Box>
    </Container>
  );
}
