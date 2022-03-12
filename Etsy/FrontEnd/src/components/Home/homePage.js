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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HomePage = () => {
  let welcomeBoard = (
    <h1>Explore one-of-a-kind finds from independent makers</h1>
  );
  const [formValue, setformValue] = useState({
    ProfileId: "",
    Name: "",
  });
  const [currencyvalue, setcurrencyValue] = useState("USD");
  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const local = JSON.parse(localStorage.getItem("user"));
      const token = local.token;
      axios
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
    }
  }, []);
  if (localStorage.getItem("user")) {
    welcomeBoard = (
      <>
        Welcome to Etsy, <a href="/profile">{formValue.Name}</a>!
      </>
    );
  } else {
    welcomeBoard = <>Explore one-of-a-kind finds from independent makers</>;
  }
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      author: "@bkristastucchio",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      author: "@rollelflex_graphy726",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      author: "@helloimnik",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      author: "@nolanissac",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      author: "@hjrc33",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      author: "@tjdragotta",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      author: "@katie_wasserman",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      author: "@silverdalex",

    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      author: "@shelleypauls",
    },
    
  ];
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
          <ImageList >
            <ImageListItem key="Subheader" cols={4}>
            </ImageListItem>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
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
            ))}
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
