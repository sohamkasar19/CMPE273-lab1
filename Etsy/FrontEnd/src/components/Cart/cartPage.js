import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import "./cartPage.css";
import "../Home/home.css";

const Cart = () => {
  const cartDetails = useSelector((state) => state);
  const [currencyvalue, setcurrencyValue] = useState("USD");
  console.log(cartDetails);
  //   let addedItems = cartDetails.addedItems ? (
  //     cartDetails.addedItems.map((item) => {
  //       return (
  //         <li className="collection-item avatar" key={item.ItemId}>
  //           <div className="item-img">
  //             <img src={item.ItemImage} alt={item.ItemImage} className="" />
  //           </div>

  //           <div className="item-desc">
  //             <span className="title">{item.ItemName}</span>
  //             <p>{item.desc}</p>
  //             <p>
  //               <b>Price: {item.Price}$</b>
  //             </p>
  //             <p>
  //               <b>Quantity: {item.quantityInCart}</b>
  //             </p>

  //             <button
  //               className="waves-effect waves-light btn pink remove"
  //             //   onClick={() => {
  //             //     this.handleRemove(item.id);
  //             //   }}
  //             >
  //               Remove
  //             </button>
  //           </div>
  //         </li>
  //       );
  //     })
  //   ) : (
  //     <p>Nothing.</p>
  //   );

  let addedItems = cartDetails.addedItems ? (
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
    <p>Nothing.</p>
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
              <ul className="cartWrap">{addedItems}</ul>
            </div>

            <div className="subtotal cf">
              <ul>
                <li className="totalRow final">
                  <span className="label">Total</span>
                  <span className="value">${cartDetails.total}</span>
                </li>
                <li className="totalRow">
                  <a href="#" className="btn continue">
                    Checkout
                  </a>
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
