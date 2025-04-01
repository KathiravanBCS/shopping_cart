import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Slice/cartSlice";
import { Navbar } from "./Navbar";
import "../Style/OrderSummery.css";

export const OrderSummary = () => {
  const { items: cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate("/");
  const handleBackToProducts = () => navigate("/ShoppingCart");

  const handlePlaceOrder = () => {
    setShowPopup(true);
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    dispatch(clearCart());
    navigate("/ShoppingCart");
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="order-summary-container">
        <button onClick={handleBackToProducts} className="back-button">
          BACK TO CART
        </button>
        <div className="order-summary-content">
          <h4>Order Summary</h4>
          <p className="items-count">You have {cartItems.length} Items In Your Shopping Cart</p>
          <div className="order-table-container">
            <table className="order-table">
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.quantity} × {item.name}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total Price</td>
                  <td>${totalPrice.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <button onClick={handlePlaceOrder} className="place-order-button">
            PLACE ORDER
          </button>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Thank You For Placing the Order!</h3>
              <button onClick={handlePopupOk} className="popup-ok-button">
                OKAY
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};