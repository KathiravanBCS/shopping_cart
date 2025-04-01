// Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/CheckOut");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome To React E-Commerce Shopping Mart
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          LOGOUT
        </Button>
        <IconButton color="inherit" onClick={handleCheckout}>
          <Badge badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};