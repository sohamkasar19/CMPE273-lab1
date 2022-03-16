import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import "./cartPage.css";
import "../Home/home.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { checkoutCart } from "../actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const local = JSON.parse(localStorage.getItem("user"));
  const token = local.token;
  const cartDetails = useSelector((state) => state);
  const [currencyvalue, setcurrencyValue] = useState("USD");
  // console.log(cartDetails);
  const handleCheckout = (e) => {
    if(cartDetails.addedItems.length !== 0) {
      var data = {
        addedItems: cartDetails.addedItems,
        total: cartDetails.total,
        token: token,
      };
      axios.post("http://localhost:8080/order/add", data).then((response) => {
        if (response.status === 200) {
          dispatch(checkoutCart());
          navigate("/purchase")
          // console.log("Axios post done from Checkout");
        }
      });
    }
    else {
      alert("Your cart is empty...")
    }
    
  };
  console.log(cartDetails.addedItems);
  let addItems = cartDetails.addedItems.length !== 0 ? (
    cartDetails.addedItems.map((item) => {
      return (
        <li className="items odd">
          <div className="infoWrap">
            <div className="cartSection">
              <p className="itemNumber">{item.ItemId}</p>
              <h3>{item.ItemName}</h3>
              <img src={item.ItemImage} alt={item.ItemImage} className="" />
              <p>
                {" "}
                <input
                  type="text"
                  className="qty"
                  placeholder={item.quantityInCart}
                  readOnly
                />{" "}
                x ${item.Price}
              </p>
            </div>

            <div className="prodTotal cartSection">
              <p>{item.quantityInCart * item.Price}</p>
            </div>
          </div>
        </li>
      );
    })
  ) : (
    <h2>OOPS!...Nothing In Cart</h2>
  );

  return (
    <div>
      <NavBar>New navigation</NavBar>
      <div className="content-container">
        <div>
          <div className="wrap cf">
            <div className="heading cf">
              <h1>My Cart</h1>
            </div>
            <div className="cart">
              <ul className="cartWrap">{addItems}</ul>
            </div>

            <div className="subtotal cf">
              <ul>
                <li className="totalRow final">
                  <span className="label">Total</span>
                  <span className="value">${cartDetails.total}</span>
                </li>
                <li className="totalRow">
                  <button onClick={handleCheckout} className="btn continue">
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer--pin">
          <Footer setcurrencyValue={setcurrencyValue} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
