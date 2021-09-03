import React, { useState, useEffect } from "react";
import { useStyles } from "./MobileMenu.styles";
import { capitalise } from "../../utils/capitaliseFirstLetter";
import {
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import {
  LocalMallOutlined as ShoppingBagIcon,
  ExitToAppOutlined as LoginIcon,
  AccountCircleOutlined as AccountIcon,
  Menu as MenuIcon,
  ArrowLeft as CategoryIcon,
} from "@material-ui/icons/";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/userSlice";
import { selectCartProducts } from "../../store/cartSlice";

export default function MobileMenu() {
  const classes = useStyles();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const cartProducts = useSelector(selectCartProducts);
  const [productCount, setProductCount] = useState(cartProducts.length);
  const categories = ["swimwear", "accessories"];

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuIsOpen(open);
  };

  const getProductCount = () => {
    let counter = 0;
    cartProducts.forEach((product) => {
      counter += product.quantity;
    });
    return counter;
  };

  useEffect(() => {
    const count = getProductCount();
    console.log("count is " + count);
    setProductCount(count);
  }, [cartProducts]);

  return (
    <>
      <React.Fragment key="right">
        <IconButton component={RouterLink} to="/cart" color="secondary">
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
        </IconButton>
        <IconButton
          onClick={toggleDrawer(true)}
          color="secondary"
          aria-label="Menu toggler"
          component="span"
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="right"
          open={menuIsOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            className={classes.drawer}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {isLoggedIn ? (
                <ListItem
                  button
                  component={RouterLink}
                  to="/account"
                  key={"Account"}
                >
                  <ListItemIcon>
                    <AccountIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText>Account</ListItemText>
                </ListItem>
              ) : (
                <ListItem
                  button
                  component={RouterLink}
                  to="/login"
                  key={"Login"}
                >
                  <ListItemIcon>
                    <LoginIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </ListItem>
              )}
            </List>
            <Divider />
            <List>
              {categories.map((text, index) => (
                <ListItem
                  button
                  component={RouterLink}
                  to={`/${text}`}
                  key={text}
                  className={classes.menuLink}
                >
                  <ListItemIcon>
                    <CategoryIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={capitalise(text)} />
                </ListItem>
              ))}
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
}
