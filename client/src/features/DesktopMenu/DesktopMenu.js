import React from "react";
import { useStyles } from "./DesktopMenu.styles";
import { List, Button, Badge } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { capitalise } from "../../utils/capitaliseFirstLetter";
import { selectIsLoggedIn } from "../../store/userSlice";
import { selectCartProducts } from "../../store/cartSlice";
import { useSelector } from "react-redux";
import {
  LocalMallOutlined as ShoppingBagIcon,
  ExitToAppOutlined as LoginIcon,
  AccountCircleOutlined as AccountIcon,
} from "@material-ui/icons/";
import "./DesktopMenu.css";

export default function DesktopMenu() {
  const classes = useStyles();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);

  const getProductCount = () => {
    let counter = 0;
    cartProducts.forEach((product) => {
      counter += product.quantity;
    });
    return counter;
  };

  const categories = ["swimwear", "accessories"];
  const userArea = isLoggedIn ? ["bag", "account"] : ["bag", "login"];

  return (
    <>
      <List className={clsx(classes.containerList, classes.listMid)}>
        {categories.map((text, index) => (
          <Button
            component={RouterLink}
            to={`/${text}`}
            key={text}
            // className={classes.customLink}
            className="custom-link"
          >
            {capitalise(text)}
          </Button>
        ))}
      </List>

      <List className={clsx(classes.containerList, classes.listRight)}>
        {userArea.map((text, index) => (
          <Button
            component={RouterLink}
            to={text === "bag" ? "/cart" : `/${text}`}
            key={text}
            // className={classes.customLink}
            className="custom-link"
          >
            {text === "bag" && (
              <Badge
                badgeContent={getProductCount()}
                color="secondary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <ShoppingBagIcon fontSize="small" />
              </Badge>
            )}
            {text === "login" && <LoginIcon fontSize="small" />}
            {text === "account" && <AccountIcon fontSize="small" />}
            {capitalise(text)}
          </Button>
        ))}
      </List>
    </>
  );
}
