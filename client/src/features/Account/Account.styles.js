import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5) + 22,
    paddingBottom: theme.spacing(6),
  },
  card: {
    padding: theme.spacing(6),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userDetails: {
    marginBottom: theme.spacing(4),
  },
  logoutButton: {
    width: "100%",
  },
}));
