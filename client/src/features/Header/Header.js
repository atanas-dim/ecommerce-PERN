import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import DesktopMenu from "../DesktopMenu/DesktopMenu";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useStyles } from "./Header.styles";
import clsx from "clsx";
import { BeachAccessOutlined as LogoIcon } from "@material-ui/icons/";

export default function Header() {
  const classes = useStyles();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", function () {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={clsx(classes.container, classes.containerMain)}>
        <Typography
          variant="body1"
          component="h1"
          className={clsx(classes.container, classes.containerLogo)}
        >
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            className={clsx(classes.logoLink)}
          >
            <LogoIcon fontSize="small" /> BeachShop
          </Link>
        </Typography>
        {!isMobile ? <DesktopMenu /> : <MobileMenu />}
      </Toolbar>
    </AppBar>
  );
}
