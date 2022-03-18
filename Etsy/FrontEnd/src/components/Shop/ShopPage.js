import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router";

function ShopPage() {

  const { state } = useLocation();

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
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      author: "@shelleypauls",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      author: "@peterlaster",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      author: "@southside_customs",
      cols: 2,
    },
  ];

  let ShopItemImages = (
    <>
      <ImageList cols={4} >
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
              subtitle={<span>by: {item.author}</span>}
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
              <img
                style={{ width: 150 }}
                class="shop-icon-external wt-rounded wt-display-block snipcss-Q6mLH snip-img"
                srcset="https://www.etsy.com/images/avatars/default_shop_icon_500x500.png 500w,
                                                                                           https://www.etsy.com/images/avatars/default_shop_icon_280x280.png 280w,
                                                                                           https://www.etsy.com/images/avatars/default_shop_icon_180x180.png 180w,
                                                                                        https://www.etsy.com/images/avatars/default_shop_icon_75x75.png 75w"
                src="https://www.etsy.com/images/avatars/default_shop_icon_180x180.png"
                sizes="(min-width: 900px) 18vw, 30vw"
                alt=""
              />
              <div className="d-flex flex-column ">
                <h1 class="display-4">&nbsp;Fluid jumbotron</h1>
                <div class="d-flex justify-content-start">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button className="rounded-pill" variant="dark">
                    Edit Shop
                  </Button>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="d-flex flex-column ">
                <img
                  style={{ width: 100, height: 100 }}
                  id="avatar_img"
                  src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"
                  // src={formValue.ProfileImagePreview}
                  alt=""
                  className="img-fluid rounded-circle"
                />
                <div className="d-flex justify-content-center">SHop Owner</div>
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
                <Button className="rounded-pill" variant="dark">
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <br/><br/>
      {ShopItemImages}
      </div>
    </>
  );
}

export default ShopPage;
