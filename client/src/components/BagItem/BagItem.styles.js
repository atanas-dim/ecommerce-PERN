import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: theme.spacing(3),
    alignSelf: "flex-start",

    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
    },
  },
  imageLink: {
    position: "relative",
    height: "160px",
    minWidth: "160px",
    overflow: "hidden",
    borderRadius: 4,
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      height: "100px",
      minWidth: "100px",
      width: "100px",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    objectFit: "cover",
  },
  productDetails: {
    width: "100%",
  },
  headingsContainer: {
    marginBottom: theme.spacing(4),
  },
  headingsMain: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  price: {
    fontWeight: 900,
  },
  categories: {
    color: theme.palette.text.secondary,
  },

  actionsContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  selectionsContainer: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(4),
    },
  },
  select: {
    minWidth: 100,
    marginRight: theme.spacing(2),
  },
  removeButton: {
    fontSize: "0.8rem",
    alignSelf: "flex-end",
    textDecoration: "underline",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("xs")]: {
      alignSelf: "flex-start",
    },
  },
}));
