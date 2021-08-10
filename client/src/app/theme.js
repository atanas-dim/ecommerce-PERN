import { createTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import blueGrey from "@material-ui/core/colors/blueGrey";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#e5ffff",
      main: cyan[100],
      dark: "#81b9bf",
    },
    secondary: {
      main: blueGrey[900],
      contrastText: blueGrey[50],
    },
    text: {
      primary: blueGrey[900],
      secondary: blueGrey[600],
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
      marginBottom: "1.4rem",
    },
    h2: {
      fontSize: "2.6rem",
      fontWeight: 500,
      marginBottom: "1.2rem",
    },
    h3: {
      fontSize: "2.2rem",
      fontWeight: 500,
      marginBottom: "1rem",
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 500,
      marginBottom: "0.8rem",
    },
    h5: {
      fontSize: "1.4rem",
      fontWeight: 500,
      marginBottom: "0.6rem",
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
      marginBottom: "0.4rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.8rem",
    },
  },
  spacing: [0, 4, 8, 16, 32, 64, 128],
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          fontSize: "20px",
          color: blueGrey[900],
          height: "100vh",
        },
        body: {
          backgroundColor: "#FFFFE5",
          height: "100%",
        },
        "#root": {
          backgroundColor: cyan[100],
          height: "auto",
        },
      },
    },

    MuiLink: {
      root: {
        fontSize: "1rem",
        color: blueGrey[900],
      },
    },
  },
});
