import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { clearCart } from "../../store/cartSlice";
import { toast } from "react-toastify";

export default function Account() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());

    toast.info("Logged out.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <div>
      <h2>
        <br />
        <br />
        <button onClick={() => handleLogout()}>Log out</button>
      </h2>
    </div>
  );
}
