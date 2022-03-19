import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ShopItemForm from "./ShopItemForm";
import ShopImage from "./ShopImage";
import EditIcon from "@mui/icons-material/Edit";
import ShopItemFormEdit from "./ShopItemFormEdit";

function ShopPage() {
  const { state } = useLocation();

  const [shopData, setShopData] = useState({});
  const [shopItems, setShopItems] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [ownerData, setOwnerData] = useState({});
  const [showItemForm, setShowItemForm] = useState(false);
  const [showItemFormEdit, setShowItemFormEdit] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    let isSubscribed = true;
    const fetchAllShopData = async () => {
      let responseShop = await axios.get("http://localhost:8080/shop/details", {
        params: {
          ShopName: state,
        },
      });

      await setShopData(responseShop.data);
      let responseOwnerDetails = await axios.get(
        "http://localhost:8080/profile/new/id",
        {
          params: {
            ProfileId: responseShop.data.ProfileId,
          },
        }
      );
      setOwnerData(responseOwnerDetails.data);
      let responseShopItems = await axios.get(
        "http://localhost:8080/shop/items",
        {
          params: {
            ShopId: responseShop.data.ShopId,
          },
        }
      );
      setShopItems(responseShopItems.data);
      if (localStorage.getItem("user")) {
        const local = JSON.parse(localStorage.getItem("user"));
        const token = local.token;
        let responseIsOwner = await axios.get(
          "http://localhost:8080/shop/check-owner",
          {
            params: {
              ShopId: responseShop.data.ShopId,
              token: token,
            },
          }
        );
        console.log("IsOwner:  " + responseIsOwner.data);
        setIsOwner(responseIsOwner.data);
      }
    };
    // await axios
    //   .get("http://localhost:8080/shop/details", {
    //     params: {
    //       ShopName: state,
    //     },
    //   })
    //   .then((responseShop) => {
    //     setShopData(responseShop.data);
    //   })
    //   .then((responseShop) => {
    //     axios
    //       .get("http://localhost:8080/profile/new/id", {
    //         params: {
    //           ProfileId: responseShop.data.ProfileId,
    //         },
    //       })
    //       .then((response) => {
    //         setOwnerData(response.data);
    //       });
    //   })
    //   .then((responseShop) => {
    //     axios
    //       .get("http://localhost:8080/shop/items", {
    //         params: {
    //           ShopId: responseShop.data.ShopId,
    //         },
    //       })
    //       .then((response) => {
    //         setShopItems(response.data);
    //       });
    //   })
    //   .then((responseShop) => {
    //     if (localStorage.getItem("user")) {
    //       const local = JSON.parse(localStorage.getItem("user"));
    //       const token = local.token;
    //       axios
    //         .get("http://localhost:8080/shop/check-owner", {
    //           params: {
    //             ShopId: responseShop.data.ShopId,
    //             token: token,
    //           },
    //         })
    //         .then((response) => {
    //           setIsOwner(response.data);
    //         });
    //     }
    //   });
    // };

    if (isSubscribed) {
      fetchAllShopData().catch(console.error());
    }
    return () => {
      isSubscribed = false;
    };
  }, [state]);

  const handleImageChange = async (event) => {
    var profilePhoto = event.target.files[0];
    var data = new FormData();
    data.append("photos", profilePhoto);
    let response = await axios.post(
      "http://localhost:8080/shop/upload-photo",
      data
    );
    var dataToPost = {
      ShopImage: response.data,
      ShopId: shopData.ShopId,
    };
    let responseImage = await axios.post(
      "http://localhost:8080/shop/add-photo",
      dataToPost
    );
    shopData.ShopImage = responseImage.data;
    // console.log(shopData.ShopImage);
    setShopData(shopData);
    window.location.reload(false);
  };

  let handleEditIcon = (item) => {
    return function () {
      setSelectedItem(item);
      setShowItemFormEdit(true);
    };
  };

  let ShopItemImages = (
    <>
      <ImageList cols={4}>
        {shopItems.map((item) => (
          <ImageListItem key={item.ItemId}>
            <img
              src={item.ItemImage}
              // src={`${item.img}?w=248&fit=crop&auto=format`}
              // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.ItemName}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.ItemName}
              subtitle={"Sales:"}
              actionIcon={
                isOwner && (
                  <EditIcon fontSize="medium" onClick={handleEditIcon(item)} />
                )
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
  return (
    <>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <div className="d-flex justify-content-between">
            <div class="d-flex justify-content-start">
              {/* {shopImage} */}
              <ShopImage data={shopData.ShopImage} />
              <div className="d-flex flex-column ">
                <h1 class="display-4">&nbsp;{shopData.ShopName}</h1>
                <div class="d-flex justify-content-start">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {isOwner && (
                    <label htmlFor="upload-photo">
                      <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <Button
                        variant="contained"
                        component="span"
                        style={{ color: "white", backgroundColor: "black" }}
                      >
                        Edit Shop Image
                      </Button>{" "}
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="d-flex flex-column ">
                <img
                  style={{ width: 100, height: 100 }}
                  id="profile-image"
                  // src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"
                  src={ownerData.ProfileImage}
                  alt=""
                  className="img-fluid rounded-circle"
                />
                {/* <br/> */}
                <div className="d-flex justify-content-center">
                  {ownerData.Name}
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        <div class="container">
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-between">
              <div>
                <h4>Shop Items</h4>
              </div>
              <div>
                {isOwner && (
                  <Button
                    style={{ color: "white", backgroundColor: "black" }}
                    // onClick={() => setShowItemForm(true)}
                    onClick={() => setShowItemForm(true)}
                  >
                    Add Item
                  </Button>
                )}
                {/* {addEditItem} */}
                <ShopItemForm
                  data={shopData}
                  show={showItemForm}
                  onHide={() => setShowItemForm(false)}
                />
                <ShopItemFormEdit
                  data={shopData}
                  show={showItemFormEdit}
                  onHide={() => setShowItemFormEdit(false)}
                  item={selectedItem}
                  key={selectedItem.ItemId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <br />
        <br />
        {ShopItemImages}
      </div>
    </>
  );
}

export default ShopPage;
