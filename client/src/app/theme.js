import { createTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import blueGrey from "@material-ui/core/colors/blueGrey";

const colors = {
  cyan: {
    light: "#e5ffff",
    main: cyan[100],
    dark: "#81b9bf",
  },
  blueGrey: {
    main: blueGrey[900],
    contrastText: blueGrey[50],
  },
};

const theme = createTheme({
  palette: {
    primary: colors.cyan,
    secondary: colors.blueGrey,
    text: {
      primary: blueGrey[900],
      secondary: blueGrey[600],
    },
  },
  spacing: [0, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
});

theme.overrides = {
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
      a: {
        color: blueGrey[900],
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
  MuiButton: {
    outlined: {
      color: blueGrey[900],
      border: `1px solid ${blueGrey[900]}`,
      "&:disabled": {
        color: colors.cyan.dark,
        border: `1px solid ${colors.cyan.dark}`,
      },
    },
  },
  MuiLink: {
    root: {
      color: blueGrey[900],
    },
  },
  MuiCard: {
    root: {
      background: theme.palette.primary.light,
    },
  },
  MuiTypography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
      marginBottom: "1.4rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.6rem",
      },
    },
    h2: {
      fontSize: "2.6rem",
      fontWeight: 500,
      marginBottom: "1rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.2rem",
      },
    },
    h3: {
      fontSize: "2.2rem",
      fontWeight: 500,
      marginBottom: "0.8rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.6rem",
      },
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 500,
      marginBottom: "0.6rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.4rem",
      },
    },
    h5: {
      fontSize: "1.4rem",
      fontWeight: 500,
      marginBottom: "0.4rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.2rem",
      },
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
      marginBottom: "0.2rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.8rem",
    },
  },
};

// console.log(theme);
export { theme };
