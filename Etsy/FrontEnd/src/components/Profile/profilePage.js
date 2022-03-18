import axios from "axios";
import React, { useEffect, useState } from "react";
import "./profilePage.css";
import "../Home/home.css";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/footer";
import { useNavigate } from "react-router";
import { Box, Grid, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [currencyvalue, setcurrencyValue] = useState("USD");
  const [favouritesList, setFavouritesList] = useState([]);
  useEffect(() => {
    let isSubscribed = true;
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    const fetchUserData = async () => {
      let responseData = await axios.get("http://localhost:8080/profile/new", {
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
        "http://localhost:8080/item/favouritesImages",
        {
          params: {
            token: token,
          },
        }
      );
      setFavouritesList(responseData.data);
    };
    if (isSubscribed) {
      fetchUserData().catch(console.error);
      fetchFavourites().catch(console.error);
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleEditIcon = () => {
    navigate("/profile");
  };

  let FavouriteItemList = (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <img
          src="https://www.etsy.com/assets/svg/profile/empty_favorite_items_new_brand.svg"
          alt=""
          width="80"
          height="95"
          class="snip-img"
        />
        <br />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <p>Nothing here... yet</p>
      </Box>
    </>
  );
  if(favouritesList) {
    FavouriteItemList = (<>
    <ImageList sx={{width:600}}>
      {favouritesList.map((item) => (
        <ImageListItem key={item.ItemId} sx={{width:200}}>
          <img
          id="item-image"
          src={item.ItemImage}
            // src={`${item.ItemImage}?w=248&fit=crop&auto=format`}
            // srcSet={`${item.ItemImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar sx={{width:200}}
            title={item.ItemName}
          />
        </ImageListItem>
      ))}
    </ImageList>
    
    </>)
  }

  return (
    <>
      <NavBar>New navigation</NavBar>

     
      <br />
      <div className="content-container">
        <div>
          <div class="container">
            <div class="d-flex justify-content-start">
              <img
                id="profile-image"
                src={userData.ProfileImage}
                alt="Avatar"
                style={{ width: "200px" }}
              />
              <h4 class="display-6">&nbsp;&nbsp;{userData.Name}</h4>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <EditIcon fontSize="large" onClick={handleEditIcon} />
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
        <Footer setcurrencyValue={setcurrencyValue} />
      </div>

      {/* <div class="container-profile-page">
        <div class="fixed">
          <img
            id="profile-image"
            src={userData.ProfileImage}
            alt="Avatar"
            style={{ width: "200px" }}
          />
        </div>
        <div class="flex-item">
          <h3>{userData.Name}</h3> 
          
        </div>
        <EditIcon />
      </div>
      <div class="container-profile-page">Favorite items</div> */}
    </>
  );
};
export default ProfilePage;
