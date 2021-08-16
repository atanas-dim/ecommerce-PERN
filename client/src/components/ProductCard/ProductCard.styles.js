import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    position: "relative",
    height: 0,
    paddingTop: "100%",
    width: "100%",

    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  buttonBase: {
    width: "100%",
  },
  text: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    width: "100%",
    height: "100%",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    "&:hover": {
      textDecoration: "none",
    },
  },
  actions: {
    width: "100%",
  },
}));
