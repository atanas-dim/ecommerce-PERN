import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
  },
  productImg: {
    height: 0,
    paddingTop: "100%", // aspect 1:1
  },
  buttonBase: {
    width: "100%",
  },
  content: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    width: "100%",
    textAlign: "left",
  },
}));
