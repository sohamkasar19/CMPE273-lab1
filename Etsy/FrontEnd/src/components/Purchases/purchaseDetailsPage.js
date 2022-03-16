import React, { useEffect, useState } from "react";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
// import "./cartPage.css";
import "../Home/home.css";
import { useLocation } from "react-router";
import axios from "axios";

const PurchaseDetailsPage = () => {
  const { state } = useLocation();

  const [itemList, setItemList] = useState([]);

  const [currencyvalue, setcurrencyValue] = useState("USD");

  useEffect(() => {
    let isSubscribed = true;
    console.log(state);
    const fetchItemList = async () => {
      const responseData = await axios.get(
        "http://localhost:8080/order/details",
        {
          params: {
            OrderId: state.OrderId,
          },
        }
      );
      if (isSubscribed) {
        setTimeout(() => {
            setItemList(responseData.data);
            console.log(responseData.data);
        });
      }
    };
    fetchItemList().catch(console.error);
    return () => {
      isSubscribed = false;
    };
  }, [state]);

  let cartDetails = itemList.map((item) => {
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
                placeholder={item.Quantity}
                readOnly
              />{" "}
              x ${item.Price}
            </p>
          </div>

          <div className="prodTotal cartSection">
            <p>$ {item.Quantity * item.Price}</p>
          </div>
        </div>
      </li>
    );
  })

  return (
    <div>
      <NavBar>New navigation</NavBar>
      <div className="content-container">
        <div>
          <div className="wrap cf">
            <div className="heading cf">
              <h1>Your Order Details <h4>Order Id : {state.OrderId}</h4></h1>
            </div>
            <div className="cart">
              <ul className="cartWrap">{cartDetails}</ul>
            </div>

            <div className="subtotal cf">
              <ul>
                <li className="totalRow final">
                  <span className="label">Total</span>
                  <span className="value">${state.Total}</span>
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

export default PurchaseDetailsPage;
