import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  card: {
    padding: theme.spacing(5),
    background: theme.palette.primary.light,
  },
  carousel: {
    width: "50%",
    overflow: "unset !important",
  },
  imageBase: {
    width: "100%",
    height: "0",
    paddingTop: "100%",
    overflow: "hidden",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
  },
}));
