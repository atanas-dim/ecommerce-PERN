import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
  },
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  containerMain: {
    maxWidth: "1440px",
    height: "64px",
    margin: "auto",
    justifyContent: "space-between",
  },

  containerLogo: {
    justifyContent: "flex-start",
  },

  logoLink: {
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),

    "& svg": {
      marginRight: theme.spacing(1),
    },
    "&:hover": {
      textDecoration: "none",
    },
  },
  containerList: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  listMid: {
    justifyContent: "center",
  },
  listRight: {
    justifyContent: "flex-end",
  },
  customLink: {
    fontSize: "1rem",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    height: "100%",
    padding: `${theme.spacing(3)}px`,

    "& svg": {
      marginRight: theme.spacing(1),
    },

    "&:hover": {
      textDecoration: "none",
    },
  },
}));
