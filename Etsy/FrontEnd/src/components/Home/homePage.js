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

const HomePage = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  let itemData = [];
  let welcomeBoard = (
    <h1>Explore one-of-a-kind finds from independent makers</h1>
  );
  const [formValue, setformValue] = useState({
    ProfileId: "",
    Name: "",
  });
  const [currencyvalue, setcurrencyValue] = useState("USD");
  const [redirect, setRedirect] = useState(false);
  const [itemName, setItemName] = useState("");
  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }
  const fetchUserData = async () => {
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    await axios
      .get("http://localhost:8080/profile", {
        params: {
          token: token,
        },
      })
      .then((response) => {
        var data = response.data;
        setformValue({
          ProfileId: data.ProfileId,
          Name: data.Name,
        });
      });
  };
  const fetchItemImages = async () => {
    await axios
      .get("http://localhost:8080/item/all-images")
      .then((response) => {
        console.log("axios get all" + response.data);
        for (let item of response.data) {
          itemData.push(item);
        }
        console.log(itemData);
        localStorage.setItem("item-images", JSON.stringify(itemData));
        window.location.reload(false);
        // console.log(itemData);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      fetchUserData();
    }
    if (!localStorage.getItem("item-images")) {
      fetchItemImages();
    }
  }, []);

  const imageClickHandler = (event) => {
    navigate('/item', {
      state: event.target.name
    });
    // setItemName(event.target.name);
    // setFlag(true);
  };
  if (localStorage.getItem("user")) {
    welcomeBoard = (
      <>
        Welcome to Etsy, <a href="/profile">{formValue.Name}</a>!
      </>
    );
  } else {
    welcomeBoard = <>Explore one-of-a-kind finds from independent makers</>;
  }

  let itemImageData = <>Loading Images</>;
  if (localStorage.getItem("item-images")) {
    itemData = localStorage.getItem("item-images");
    itemData = JSON.parse(itemData);
    // console.log( JSON.parse(itemData));
    itemImageData = itemData.map((item) => (
      <ImageListItem>
        <img
          src={item.ItemImage}
          // src={`${"data:image/png;base64,"+item.ItemImage}?w=248&fit=crop&auto=format`}
          // srcSet={`${"data:image/png;base64,"+item.ItemImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
          name={item.ItemId}
          alt={item.ItemName}
          onClick={imageClickHandler}
          // loading="lazy"
        />
        <ImageListItemBar
          title={item.ItemName}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${item.title}`}
            >
              <FavoriteBorderIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    ));
  }
  // const getARedirect = (flag) => {
  //   if (flag) {
  //     <Navigate
  //       to={{
  //         pathname: "/item",
  //         state: itemName,
  //       }}
  //     />;
  //   }
  // };
  return (
    <>
      {/* {flag && (
        <Navigate
          to={{
            pathname: "/item",
            state: itemName,
          }}
        />
      )} */}
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
          <ImageList>
            <ImageListItem key="Subheader" cols={4}></ImageListItem>
            {itemImageData}
            {/* {itemData.map((item) => (
              <ImageListItem >
                <img
                  // src={item.ItemImage}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.ItemName}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))} */}
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
