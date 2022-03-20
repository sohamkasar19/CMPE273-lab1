import React, { useEffect, useState } from "react";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import "../Home/home.css";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Button, ImageListItem, ImageListItemBar } from "@mui/material";
import Favourite from "../Home/favourite";
import {API} from '../../Backend';

const Item = () => {
  // let resObj = {};
  const { state } = useLocation();
  let navigate = useNavigate();
  const reduxState = useSelector((state) => state);

  const [itemDetails, setItemDetails] = useState({});
  const [currencyvalue, setcurrencyValue] = useState(reduxState.currency);
  const [itemCount, setItemCount] = useState(1);
  const [shopName, setShopName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    const fetchItemData = async () => {
      let responseItem = await axios.get(API+"/item/details", {
        params: {
          ItemId: state,
        },
      });
      setItemDetails(responseItem.data[0]);
      // .then((response) => {
      //   if (response.status === 200) {
      //     // console.log(response.data[0]);
      //     const itemData = response.data[0];
      //     setItemDetails(itemData);
      //     // console.log(itemData);
      //   }
      // });
      let responseShop = await axios.get(
        API+"/shop/details-by-id",
        {
          params: {
            ShopId: responseItem.data[0].ShopId,
          },
        }
      );
      setShopName(responseShop.data.ShopName);
    };

    if (isSubscribed) {
      fetchItemData().catch(console.error);
      setcurrencyValue(reduxState.currency);
    }
    return () => {
      isSubscribed = false;
    };
  }, [reduxState.currency]);

  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }

  const handleAddToCart = (event) => {
    // console.log(itemCount +" "+ itemDetails.QuantityAvailable);
    // let existed_item = state.addedItems ? state.addedItems.find((item) => item.ItemId === itemDetails.ItemId) : null;
    // console.log("existing" + existed_item);
    // let orderCount = itemCount;
    // if(existed_item) {

    //   orderCount += existed_item.quantityInCart;
    // }
    if (itemCount > itemDetails.QuantityAvailable) {
      alert("Oops!!! We don't have that much item in stock. Try Again Later!");
    } else {
      alert("Added to Cart");
      dispatch(addToCart(itemDetails, itemCount));
    }

    // markComplete(itemDetails, itemCount);
  };

  const handleItemCount = (event) => {
    setItemCount(event.target.value);
  };
  // let ItemDescription = (
  //   <>Description goes here</>
  // )
  // if(itemDetails.Description.length > 0) {
  //   <>{itemDetails.Description}</>
  // }
  const handleShopButton = () => {
    navigate("/your-shop", {
      state: shopName,
    });
  };

  let AddToCartButton = (
    <>
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
      <Button
        sx={{ backgroundColor: "black", color: "white" }}
        onClick={handleAddToCart}
      >
        {" "}
        Add to cart
      </Button>
    </>
  );

  if (itemDetails.QuantityAvailable === 0) {
    AddToCartButton = <h4>Item Out Of Stock</h4>;
  }

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
                      {" "}
                      {/* <img
                        src={itemDetails.ItemImage}
                        alt={itemDetails.ItemName}
                      /> */}
                      <ImageListItem key={itemDetails.ItemId}>
                        <img
                          src={itemDetails.ItemImage}
                          name={itemDetails.ItemId}
                          alt={itemDetails.ItemName}
                        />
                        <ImageListItemBar
                          sx={{ backgroundColor: "transparent" }}
                          actionIcon={
                            <Favourite data={itemDetails}></Favourite>
                          }
                          position="top"
                        />
                      </ImageListItem>
                    </div>
                  </article>
                </aside>
                <main className="col-md-6">
                  <article>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-start">
                        <div className="d-flex flex-column">
                          <div className="d-flex justify-content-between"></div>
                          <h6>Category: {itemDetails.Category}</h6>{" "}
                          <h2 className="title">{itemDetails.ItemName}</h2>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-end">
                          <Button
                            sx={{ color: "black" }}
                            variant="text"
                            onClick={handleShopButton}
                          >
                            <h6>Shop: {shopName}</h6>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="mb-3">
                      <h6>Short description</h6>
                      <p>
                        {itemDetails.Description || <>Description goes here</>}
                      </p>
                    </div>

                    <div className="mb-3">
                      <var className="price h4">
                        {currencySymbol} {itemDetails.Price}
                      </var>{" "}
                      <br />
                    </div>

                    <div className="mb-4">
                      {/* <button
                        onClick={handleAddToCart}
                        className="btn btn-primary mr-1"
                      >
                        Add to cart
                      </button> */}
                      {/* <Button
                        sx={{ backgroundColor: "black", color: "white" }}
                        onClick={handleAddToCart}
                      >
                        {" "}
                        Add to cart
                      </Button> */}
                      {AddToCartButton}
                      &nbsp;&nbsp;&nbsp; {itemDetails.QuantitySold} sales
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="footer--pin">
        <Footer />
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
