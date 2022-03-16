import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import "../Home/home.css";
import { useNavigate } from "react-router";

const PurchasePage = () => {
  const navigate = useNavigate();
  const [purchaseData, setPurchaseData] = useState([]);
  const [currencyvalue, setcurrencyValue] = useState("USD");
  useEffect(() => {
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
    getPurchaseData().catch(console.error);
    return () => {
      isSubscribed = false;
    };
  }, []);

 

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

  return (
    <div>
      <div class="content-container">
        <NavBar>New navigation</NavBar>
        <div id="content" class="col-sm-12">
          <h2 class="title">Order History</h2>
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
        </div>
      </div>
      <div className="footer--pin">
        <Footer setcurrencyValue={setcurrencyValue} />
      </div>
    </div>
  );
};
export default PurchasePage;
