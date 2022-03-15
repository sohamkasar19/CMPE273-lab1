import React, { useEffect, useState } from "react";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import "../Home/home.css";
import { useLocation } from "react-router";
import axios from "axios";

const Item = () => {
  // let resObj = {};
  const { state } = useLocation();

  const [itemDetails, setItemDetails] = useState({});

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
    if(isSubscribed) {
      fetchItemData().catch(console.error)
    }
    return () => {
      isSubscribed = false;
    };
  }, [state])

  // const [itemDetails, setItemDetails] = useState({
  //   ItemId: "",
  //   ItemName: "",
  //   ItemImage: "",
  //   Price: "",
  //   QuantityAvailable: "",
  //   QuantitySold: "",
  //   ShopId: "",
  // });
  const [currencyvalue, setcurrencyValue] = useState("USD");

  // useEffect(() => {
  //   let isSubscribed = true;
  //   let itemData = null;
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
  //           itemData = response.data[0];
  //           // console.log(itemData);
  //         }
  //       });
  //     if (isSubscribed) {
  //       setItemDetails({
  //         ItemId: itemData.ItemId,
  //         ItemName: itemData.ItemName,
  //         ItemImage: itemData.ItemImage,
  //         Price: itemData.Price,
  //         QuantityAvailable: itemData.QuantityAvailable,
  //         QuantitySold: itemData.QuantitySold,
  //         ShopId: itemData.ShopId,
  //       });
  //       console.log(itemDetails);
  //     }
  //   };
  //   fetchItemData().catch(console.error);
  //   return () => {
  //     isSubscribed = false;
  //   };
  // }, []);

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
                        <img src={itemDetails.ItemImage}   alt={itemDetails.ItemName} />
                      </a>
                    </div>
                  </article>
                </aside>
                <main className="col-md-6">
                  <article>
                    <h5>
                      {itemDetails.Category}
                    </h5>
                    <h3 className="title">{itemDetails.ItemName}</h3>
                    

                    <hr />

                    <div className="mb-3">
                      <h6>Short description</h6>
                      <p>{itemDetails.description || <>Description goes here</>}</p>
                    </div>

                    <div className="mb-3">
                      <var className="price h4">${itemDetails.Price}</var> <br />
                      
                    </div>

                    <div className="mb-4">
                      <a href="#" className="btn btn-primary mr-1">
                        Buy now
                      </a>
                      <a href="#" className="btn btn-light">
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

export default Item;
