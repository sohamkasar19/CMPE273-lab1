import React, { useEffect, useState } from "react";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
// import "./cartPage.css";
import "../Home/home.css";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useSelector } from "react-redux";
import {API} from '../../Backend';


const PurchaseDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);

  const reduxState = useSelector((state) => state);
  const [currencyvalue, setcurrencyValue] = useState(reduxState.currency);

  useEffect(() => {
    if(!localStorage.getItem("user")) {
      navigate('/home');
      window.location.reload(false);
    }
    let isSubscribed = true;
    console.log(state);
    const fetchItemList = async () => {
      const responseData = await axios.get(
        API+"/order/details",
        {
          params: {
            OrderId: state.OrderId,
          },
        }
      );
      if (isSubscribed) {
        setcurrencyValue(reduxState.currency);
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
  }, [navigate, reduxState.currency, state]);
  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }

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
              x {currencySymbol}{item.Price}
            </p>
          </div>

          <div className="prodTotal cartSection">
            <p>{currencySymbol} {item.Quantity * item.Price}</p>
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
                  <span className="value">{currencySymbol}{state.Total}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer--pin">
          <Footer  />
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailsPage;
