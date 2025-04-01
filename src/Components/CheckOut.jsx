import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart, addToCart } from "../Slice/cartSlice";
import { Navbar } from "./Navbar";
import "../Style/CheckOut.css";

export const CheckOut = () => {
  const { items: cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackToProducts = () => navigate("/ShoppingCart");
  const handleCheckout = () => navigate("/OrderSummary");
  const handleLogout = () => navigate("/");

  return (
    <>
      {/* <Navbar /> */}
      <div className="checkout-container">
        <button onClick={handleBackToProducts} className="back-button">
          BACK TO PRODUCTS
        </button>
        <h3 className="checkout-title">Shopping Cart</h3>
        <div className="cart-header">
          <p className="items-count">You Have {cartItems.length} Items in Your Cart</p>
          <button 
            onClick={() => dispatch(clearCart())} 
            className="clear-cart-button"
          >
            CLEAR SHOPPING CART
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={product.id}>
                  <td className="product-cell">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <p className="product-name">{product.name}</p>
                  </td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => dispatch(removeFromCart(product.id))}>-</button>
                      <span>{product.quantity}</span>
                      <button onClick={() => dispatch(addToCart(product))}>+</button>
                    </div>
                  </td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan="2">Total Price</td>
                <td>${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="checkout-button-container">
          <button onClick={handleCheckout} className="checkout-button">
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
};