import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  card: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
    },
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    marginBottom: theme.spacing(4),
  },
  loginButton: {
    marginBottom: theme.spacing(4),
  },
  newToShop: {
    marginRight: theme.spacing(2),
  },
}));
