import React, { useState } from "react";
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
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import {
  LocalMallOutlined as ShoppingBagIcon,
  ExitToAppOutlined as LoginIcon,
  Menu as MenuIcon,
  ArrowLeft as CategoryIcon,
} from "@material-ui/icons/";

export default function MobileMenu() {
  const classes = useStyles();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

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

  return (
    <>
      <React.Fragment key="right">
        <IconButton component={RouterLink} to="/cart" color="secondary">
          <ShoppingBagIcon fontSize="small" />
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
              <ListItem button component={RouterLink} to="/login" key={"Login"}>
                <ListItemIcon>
                  <LoginIcon color="secondary" />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </ListItem>
            </List>
            <Divider />
            <List>
              {["swimwear", "accessories"].map((text, index) => (
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
