import React from "react";
import { useStyles } from "./DesktopMenu.styles";
import { List, ButtonBase } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { capitalise } from "../../utils/capitaliseFirstLetter";
import {
  LocalMallOutlined as ShoppingBagIcon,
  ExitToAppOutlined as LoginIcon,
} from "@material-ui/icons/";

export default function DesktopMenu() {
  const classes = useStyles();

  return (
    <>
      <List className={clsx(classes.containerList, classes.listMid)}>
        {["swimwear", "accessories"].map((text, index) => (
          <ButtonBase
            component={RouterLink}
            to={`/${text}`}
            key={text}
            className={classes.menuLink}
          >
            {capitalise(text)}
          </ButtonBase>
        ))}
      </List>

      <List className={clsx(classes.containerList, classes.listRight)}>
        {["bag", "login"].map((text, index) => (
          <ButtonBase
            component={RouterLink}
            to={text === "bag" ? "/cart" : `/${text}`}
            key={text}
            className={classes.menuLink}
          >
            {text === "bag" && <ShoppingBagIcon fontSize="small" />}
            {text === "login" && <LoginIcon fontSize="small" />}
            {capitalise(text)}
          </ButtonBase>
        ))}
      </List>
    </>
  );
}
