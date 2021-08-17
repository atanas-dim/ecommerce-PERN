import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxWidth: "440px",
    flexDirection: "column",
    alignSelf: "flex-start",

    [theme.breakpoints.down("md")]: {
      maxWidth: "none",
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
    },
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
  subtotalContainer: {
    width: "100%",
    marginBottom: theme.spacing(4),
  },
  subtotalEntry: {
    marginBottom: theme.spacing(3),
  },
  totalContainer: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  totalValue: {
    fontWeight: 900,
  },
  checkoutButton: {
    width: "100%",
  },
}));
