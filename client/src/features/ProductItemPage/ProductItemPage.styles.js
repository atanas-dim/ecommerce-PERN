import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5) + 22,
    paddingBottom: theme.spacing(6),
  },
  card: {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
    },
  },
  backButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  carousel: {
    width: "60%",
    overflow: "unset !important",
    marginRight: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: theme.spacing(5),
    },
  },
  imageBase: {
    height: "100%",
    paddingTop: "100%",
    overflow: "hidden",
    position: "relative",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
  },
  productInfo: {
    width: "40%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  productTitleContainer: {
    width: "100%",
    marginBottom: theme.spacing(3),
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  sizeGuideLink: {
    color: theme.palette.text.secondary,
  },
  sizesTitle: {
    marginBottom: theme.spacing(2),
  },
  price: {
    width: "fit-content",
    fontWeight: 900,
    flex: "0 0 auto",
    textAlign: "end",

    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      textAlign: "left",
      flex: "none",
    },
  },
  sizeButtonsContainer: {
    marginBottom: theme.spacing(3),
    flexWrap: "wrap",
  },
  sizeButton: {
    width: "100%",
  },
  sizeButtonSelected: {
    background: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: "rgb(129 185 191 / 80%)",
    },
  },
  sizeButtonSoldOut: {
    "&::before": {
      content: '"sold out"',
      fontSize: "0.4rem",
      fontWeight: "700",
      position: "absolute",
      top: -6,
      background: theme.palette.primary.light,
      padding: "0 2px",
    },
  },
  addButton: {
    marginBottom: theme.spacing(4),
  },
  description: {
    height: "100%",
    maxHeight: "180px",
    overflowY: "scroll",
    overflowX: "inherit",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "none",
    },
  },
}));
