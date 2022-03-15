import React, { useEffect, useState } from "react";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import "../Home/home.css";
import { useLocation } from "react-router";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

const Item = () => {
  // let resObj = {};
  const { state } = useLocation();

  const [itemDetails, setItemDetails] = useState({});

  const [itemCount, setItemCount] = useState(1);

  const dispatch = useDispatch();

  // useLayoutEffect(() => {
  //   const fetchItemData = async () => {
  //     await axios
  //       .get("http://localhost:8080/item/details", {
  //         params: {
  //           ItemId: state,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           // console.log(response.data[0]);
  //           const itemData = response.data;
  //           setItemDetails(itemData);
  //           // console.log(itemData);
  //         }
  //       });
  //   };
  //   fetchItemData();
  // }, []);
  useEffect(() => {
    let isSubscribed = true;
    const fetchItemData = async () => {
      await axios
        .get("http://localhost:8080/item/details", {
          params: {
            ItemId: state,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data[0]);
            const itemData = response.data[0];
            setItemDetails(itemData);
            // console.log(itemData);
          }
        });
    };
    if (isSubscribed) {
      fetchItemData().catch(console.error);
    }
    return () => {
      isSubscribed = false;
    };
  }, [state]);

  const handleAddToCart = (event) => {
    dispatch(addToCart(itemDetails, itemCount));
    // markComplete(itemDetails, itemCount);
  };

  const handleItemCount = (event) => {
    setItemCount(event.target.value);
  };

  const [currencyvalue, setcurrencyValue] = useState("USD");

  return (
    <div className="App">
      <NavBar>New navigation</NavBar>
      <section className="content-container">
        <div className="container">
          <article className="card">
            <div className="card-body">
              <div className="row">
                <aside className="col-md-6">
                  <article className="gallery-wrap">
                    <div className="card img-big-wrap">
                      <a href="#">
                        {" "}
                        <img
                          src={itemDetails.ItemImage}
                          alt={itemDetails.ItemName}
                        />
                      </a>
                    </div>
                  </article>
                </aside>
                <main className="col-md-6">
                  <article>
                    <h5>{itemDetails.Category}</h5>
                    <h3 className="title">{itemDetails.ItemName}</h3>

                    <hr />

                    <div className="mb-3">
                      <h6>Short description</h6>
                      <p>
                        {itemDetails.description || <>Description goes here</>}
                      </p>
                    </div>

                    <div className="mb-3">
                      <var className="price h4">${itemDetails.Price}</var>{" "}
                      <br />
                    </div>

                    <div className="mb-4">
                      <label for="quantity">Quantity: </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={itemCount}
                        min="1"
                        onChange={handleItemCount}
                      />
                      <br />
                      <br />
                      <a
                        onClick={handleAddToCart}
                        className="btn btn-primary mr-1"
                      >
                        Add to cart
                      </a>
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="footer--pin">
        <Footer setcurrencyValue={setcurrencyValue} />
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   markComplete: (itemDetails, itemCount) => {
//     dispatch(addToCart(itemDetails, itemCount));
//   },
// });

export default Item;
