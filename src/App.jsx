// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EcommerceLogin } from "./Components/EcommerceLogin"; 
import { ShoppingCart } from "./Components/ShoppingCart"; 
import { CheckOut } from "./Components/CheckOut"; 
import { OrderSummary } from "./Components/OrderSummery";
import { Navbar } from "./Components/Navbar"; 



const Layout = ({ children }) => {
  return (
    <>
      <Navbar /> 
      {children} 
    </>
  );
};

const App = () => {
  return (
    <Router>
        <Routes>
         
          <Route path="/" element={<EcommerceLogin />} />

        
          <Route
            path="/ShoppingCart"
            element={
              <Layout>
                <ShoppingCart />
              </Layout>
            }
          />
          <Route
            path="/CheckOut"
            element={
              <Layout>
                <CheckOut />
              </Layout>
            }
          />
          <Route
            path="/OrderSummary"
            element={
              <Layout>
                <OrderSummary />
              </Layout>
            }
          />
        </Routes>

    </Router>
  );
};

export default App;
