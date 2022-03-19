import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.css";
import { Card } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/footer";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import Favourite from "./favourite";
import Heart from "react-animated-heart";

const HomePage = () => {
  const navigate = useNavigate();
  const [favouritesList, setFavouritesList] = useState([]);

  let welcomeBoard = (
    <h1>Explore one-of-a-kind finds from independent makers</h1>
  );


  const [formValue, setformValue] = useState({
    ProfileId: "",
    Name: "",
  });

  const [currencyvalue, setcurrencyValue] = useState("USD");

  const [itemList, setItemList] = useState([]);

  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }
  
  useEffect(() => {
    let isSubscribed = true;

    const fetchUserData = async () => {
      const local = JSON.parse(localStorage.getItem("user"));
      const token = local.token;
      let responseData = await axios.get("http://localhost:8080/profile", {
        params: {
          token: token,
        },
      });
      setformValue({
        ProfileId: responseData.data.ProfileId,
        Name: responseData.data.Name,
      });
    };
    const fetchItemImages = async () => {
      let responseData = await axios.get(
        "http://localhost:8080/item/all-images"
      );
      setItemList(responseData.data);
    };
    const fetchFavourites = async () => {
      const local = JSON.parse(localStorage.getItem("user"));
      const token = local.token;
      let responseData = await axios.get(
        "http://localhost:8080/item/favourites",
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
      fetchItemImages().catch(console.error);
      fetchFavourites().catch(console.error);
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  const imageClickHandler = (event) => {
    navigate("/item", {
      state: event.target.name,
    });
  };
  if (localStorage.getItem("user")) {
    welcomeBoard = (
      <p>
        Welcome to Etsy, <a href="/profile-page">{formValue.Name}</a>!
      </p>
    );
  } else {
    welcomeBoard = <>Explore one-of-a-kind finds from independent makers</>;
  }

 

  let itemImageData = <>Loading Images</>;
  if (itemList) {
    itemImageData = itemList.map((item) => (
      <ImageListItem key={item.ItemId}> 
        <img
          src={item.ItemImage}
          name={item.ItemId}
          alt={item.ItemName}
          onClick={imageClickHandler}
        />
        <ImageListItemBar 
          title={item.ItemName}
          actionIcon={<Favourite data={item}></Favourite>}
        />
      </ImageListItem>
    ));
  }

  return (
    <>
      <div>
        <div className="content-container">
          <NavBar>New navigation</NavBar>

          <Card
            style={{
              textAlign: "center",
              background: "#fdebd2",
              height: "200px",
            }}
          >
            <Card.Body>
              <Card.Text
                style={{ fontSize: "50px", fontFamily: "Times New Roman" }}
              >
                {welcomeBoard}
              </Card.Text>
            </Card.Body>
          </Card>
          <ImageList cols={4}>
           
            {itemImageData}
          </ImageList>
          {currencySymbol}
          {currencyvalue}
        </div>
        <div className="footer--pin">
          <Footer setcurrencyValue={setcurrencyValue} />
        </div>
      </div>
    </>
  );
};
export default HomePage;
