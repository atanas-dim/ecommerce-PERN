import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    height: "500px",
    backgroundImage: "url(/assets/footer-bg.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top",
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    fontWeight: 900,
    fontSize: "0.8rem",
    "& svg": {
      marginRight: theme.spacing(1),
    },
  },
  gridContainer: {
    maxWidth: "800px",
    margin: "auto",
  },
  gridColumn: {
    display: "flex",
    flexDirection: "column",
    "& a": {
      fontSize: "0.8rem",
    },
  },
}));
