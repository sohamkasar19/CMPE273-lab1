import axios from "axios";
import React, { useEffect, useState } from "react";
import "./profilePage.css";
import "../Home/home.css";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/footer";
import { useNavigate } from "react-router";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { Button } from "react-bootstrap";
import {API} from '../../Backend';


const ProfilePage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const [favouritesList, setFavouritesList] = useState([]);
  // const [shopData, setShopData] = useState({});

  

  useEffect(() => {
    if(!localStorage.getItem("user")) {
      navigate('/home');
      window.location.reload(false);
    }
    let isSubscribed = true;
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    const fetchUserData = async () => {
      let responseData = await axios.get(API+"/profile/new", {
        params: {
          token: token,
        },
      });
      setUserData(responseData.data);
    };
    const fetchFavourites = async () => {
      const local = JSON.parse(localStorage.getItem("user"));
      const token = local.token;
      let responseData = await axios.get(
        API+"/item/favouritesImages",
        {
          params: {
            token: token,
          },
        }
      );
      setFavouritesList(responseData.data);
    };
    // const fetchShopData = async () => {
    //   const local = JSON.parse(localStorage.getItem("user"));
    //   const token = local.token;
    //   let responseData = await axios.get(
    //     API+"/shop/details-by-id",
    //     {
    //       params: {
    //         token: token,
    //       },
    //     }
    //   );
    //   setFavouritesList(responseData.data);
    // };
    if (isSubscribed) {
      fetchUserData().catch(console.error);
      fetchFavourites().catch(console.error);
    }

    return () => {
      isSubscribed = false;
    };
  }, [navigate]);

  const handleEditIcon = () => {
    navigate("/profile");
  };
  const handleYourShopButton = async () => {
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    axios
        .get(API+"/profile/check-address", {
          params: {
            token: token,
          },
        }).then((responseCheck) => {
          if(responseCheck.data) {
            axios.get(
              API+"/shop/check-shop-exists",
              {
                params: {
                  token: token,
                },
              }
            ).then((response) => {
              if (response.data === "Not Found") {
                navigate("/name-your-shop");
              } else {
                navigate("/your-shop", {
                  state: response.data,
                });
              }
            })
            // console.log(response.data === "Not Found");
          }
          else{
            alert("You don't have any delivery address... Edit in your profile");
          }
        })
  };
  const imageClickHandler = (event) => {
    navigate("/item", {
      state: event.target.name,
    });
  };

  let FavouriteItemList = (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <img
          src="https://www.etsy.com/assets/svg/profile/empty_favorite_items_new_brand.svg"
          alt=""
          width="150"
          height="150"
        />
        <br />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <p>Nothing here... yet</p>
      </Box>
    </>
  );
  if (favouritesList.length !== 0) {
    FavouriteItemList = (
      <>
        <ImageList cols={4}>
          {favouritesList.map((item) => (
            <ImageListItem key={item.ItemId}>
              <img
                id="item-image"
                src={item.ItemImage}
                name={item.ItemId}
                // src={`${item.ItemImage}?w=248&fit=crop&auto=format`}
                // srcSet={`${item.ItemImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                onClick={imageClickHandler}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar title={item.ItemName} />
            </ImageListItem>
          ))}
        </ImageList>
      </>
    );
  }

  let profileImageData = (
    <img
      id="avatar_img"
      src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"
      // src={formValue.ProfileImagePreview}
      alt=""
      className="img-fluid rounded-circle"
    />
  );
  if (userData.ProfileImage) {
    profileImageData = (
      <img
        id="profile-image"
        src={userData.ProfileImage}
        alt="Avatar"
        style={{ width: "200px" }}
      />
    );
  }

  return (
    <>
      <NavBar>New navigation</NavBar>

      <br />
      <div className="content-container">
        <div>
          <div class="container">
            <div class="d-flex justify-content-between">
              <div class="d-flex justify-content-start">
                <div className="image-cropper">
                  {/* <img
                    id="profile-image"
                    src={userData.ProfileImage}
                    alt="Avatar"
                    style={{ width: "200px" }}
                  /> */}
                  {profileImageData}
                </div>
                <h4 class="display-6">&nbsp;&nbsp;{userData.Name}</h4>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <EditIcon fontSize="large" onClick={handleEditIcon} />
              </div>
              <div className="d-flex justify-content-end">
                <div class="d-flex flex-column">
                  <div></div>
                  <br />
                  <Button variant="dark" onClick={handleYourShopButton}>
                    Your Shop
                  </Button>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <h4>Favourite Items</h4>
            {FavouriteItemList}
          </div>
        </div>
      </div>
      <div className="footer--pin">
        <Footer />
      </div>
    </>
  );
};
export default ProfilePage;
