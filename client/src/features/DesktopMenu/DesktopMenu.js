import React, { useEffect, useState } from "react";
import { List, Button, Badge } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
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
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);
  const [productCount, setProductCount] = useState(cartProducts.length);

  const getProductCount = () => {
    let counter = 0;
    cartProducts.forEach((product) => {
      counter += product.quantity;
    });
    return counter;
  };

  useEffect(() => {
    const count = getProductCount();
    setProductCount(count);
  }, [cartProducts]);

  const categories = ["swimwear", "accessories"];
  const userArea = isLoggedIn ? ["bag", "account"] : ["bag", "login"];

  return (
    <>
      <List className="container-list list-mid">
        {categories.map((text, index) => (
          <Button
            component={RouterLink}
            to={`/${text}`}
            key={text}
            className="custom-link"
          >
            {capitalise(text)}
          </Button>
        ))}
      </List>

      <List className="container-list list-right">
        {userArea.map((text, index) => (
          <Button
            component={RouterLink}
            to={text === "bag" ? "/cart" : `/${text}`}
            key={text}
            className="custom-link"
          >
            {text === "bag" && (
              <Badge
                badgeContent={productCount}
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
