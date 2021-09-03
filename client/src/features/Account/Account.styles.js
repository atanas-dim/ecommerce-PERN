import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5) + 22,
    paddingBottom: theme.spacing(6),
  },
  card: {
    padding: theme.spacing(6),
    textAlign: "center",
    width: "100%",
  },
  userDetails: {
    marginBottom: theme.spacing(4),
  },
}));
