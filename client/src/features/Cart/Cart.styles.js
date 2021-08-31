import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5) + 22,
    paddingBottom: theme.spacing(6),
  },
  cardsContainer: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  bagItemsContainer: {
    width: "100%",
    marginRight: theme.spacing(3),
  },
  emptyCart: {
    padding: theme.spacing(6),
    textAlign: "center",
    width: "100%",
  },
}));
