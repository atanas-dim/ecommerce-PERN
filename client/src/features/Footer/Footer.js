import React from "react";
import {
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Facebook,
  BeachAccessOutlined as LogoIcon,
} from "@material-ui/icons/";
import { useStyles } from "./Footer.styles";

export default function Footer() {
  const classes = useStyles();

  return (
    <Container component="footer" className={classes.root}>
      <Grid
        container
        justifyContent="center"
        spacing={3}
        className={classes.gridContainer}
      >
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="span"
            className={classes.footerLogo}
          >
            <LogoIcon fontSize="small" /> BeachShop
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.gridColumn}>
          <Link component={RouterLink} to="#" color="inherit">
            Swimwear
          </Link>
          <Link component={RouterLink} to="#" color="inherit">
            Accessories
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className={classes.gridColumn}>
          <Link component={RouterLink} to="#" color="inherit">
            About
          </Link>
          <Link component={RouterLink} to="#" color="inherit">
            Press
          </Link>
          <Link component={RouterLink} to="#" color="inherit">
            Contact us
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className={classes.gridColumn}>
          <Link component={RouterLink} to="#" color="inherit">
            Deliveries
          </Link>
          <Link component={RouterLink} to="#" color="inherit">
            Returns
          </Link>
          <Link component={RouterLink} to="#" color="inherit">
            Order tracking
          </Link>
        </Grid>
        <Grid item sm={12} md={3} className={classes.socialLinks}>
          <IconButton
            component={RouterLink}
            to="#"
            color="inherit"
            aria-label="Instagram"
          >
            <Instagram />
          </IconButton>
          <IconButton
            component={RouterLink}
            to="#"
            color="inherit"
            aria-label="Twitter"
          >
            <Twitter />
          </IconButton>
          <IconButton
            component={RouterLink}
            to="#"
            color="inherit"
            aria-label="Facebook"
          >
            <Facebook />
          </IconButton>
        </Grid>
        <Grid item xs={12} className={classes.socialLinks}>
          <Typography variant="body2" component="span">
            Original products from H&M
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
