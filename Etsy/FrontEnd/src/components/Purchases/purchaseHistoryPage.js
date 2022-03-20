import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import "../Home/home.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";


const PurchasePage = () => {
  const navigate = useNavigate();
  const [purchaseData, setPurchaseData] = useState([]);
  const reduxState = useSelector((state) => state);
  const [currencyvalue, setcurrencyValue] = useState(reduxState.currency);
  useEffect(() => {
    if(!localStorage.getItem("user")) {
      navigate('/home');
      window.location.reload(false);
    }
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    let isSubscribed = true;
    const getPurchaseData = async () => {
      const responseData = await axios.get(
        "http://localhost:8080/order/all-orders",
        {
          params: {
            token: token,
          },
        }
      );
      // if(responseData.length === 1) responseData = [responseData];
      if (isSubscribed) {
        setTimeout(() => {
          setPurchaseData(responseData.data);
        });
      }
    };
    if(isSubscribed) {
      getPurchaseData().catch(console.error);
      setcurrencyValue(reduxState.currency);
    }
    
    return () => {
      isSubscribed = false;
    };
  }, [navigate, reduxState.currency]);

  

 

  let purchases = purchaseData.map((order) => {
    return (
      <tr>
        <td
          class="text-center"
          onClick={() => {
            navigate("/purchase-details", {
              state: order,
            });
          }}
        >
          {order.OrderId}
        </td>
        <td class="text-center">{order.OrderDate.split("T")[0]}</td>
        <td class="text-right">${order.Total}</td>
      </tr>
    );
  });

  let purchasesTable = <h3>You haven't ordered anything</h3>;

  if (purchaseData) {
    purchasesTable = (
      <>
        <p>Click on order id for more details</p>
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <td class="text-center">Order ID</td>
                <td class="text-center">Date Added</td>
                <td class="text-right">Total</td>
              </tr>
            </thead>
            <tbody>{purchases}</tbody>
          </table>
        </div>
      </>
    );
  }

  let OrderHistory = (<h3>You don't have any previous orders yet..</h3>)
  if(purchaseData.length > 0) {
    OrderHistory = (
      <div className="d-flex flex-column ">
            <br/>
            <h2 class="title">Order History</h2>
            {/* <p>Click on order id for more details</p>
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <td class="text-center">Order ID</td>
                  <td class="text-center">Date Added</td>
                  <td class="text-right">Total</td>
                </tr>
              </thead>
              <tbody>{purchases}</tbody>
            </table>
          </div> */}
          {purchasesTable}
          </div>
    )
  }

  return (
    <div>
      <div class="content-container">
        <NavBar>New navigation</NavBar>
        <div id="content" className="d-flex justify-content-center">
          {OrderHistory}
        </div>
      </div>
      <div className="footer--pin">
        <Footer  />
      </div>
    </div>
  );
};
export default PurchasePage;
