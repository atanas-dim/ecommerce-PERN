import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // width: "auto",
    height: "100%",
    padding: theme.spacing(3),
    textTransform: "none",
    borderRadius: 0,
    // marginRight: theme.spacing(1),

    // "&:last-of-type": {
    //   marginRight: 0,
    // },

    "& svg": {
      marginRight: theme.spacing(1),
    },

    "&:hover": {
      textDecoration: "none",
    },
  },
}));
