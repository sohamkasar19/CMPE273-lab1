import axios from "axios";
import React, { useEffect, useState } from "react";
import Heart from "react-animated-heart";
import {API} from '../../Backend';

function Favourite(props) {
  const [isFavourite, setFavourite] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const fetchFavourites = async () => {
      const local = JSON.parse(localStorage.getItem("user"));
      const token = local.token;
      let responseData = await axios.get(
        API+"/item/favourites",
        {
          params: {
            token: token,
          },
        }
      );

      for (let obj of responseData.data) {
        if (obj.ItemId === props.data.ItemId) {
          setFavourite(true);
        }
      }
    };

    if (isSubscribed) {
      fetchFavourites().catch(console.error);
    }
    return () => {
      isSubscribed = false;
    };
  }, [props.data.ItemId]);

  const handleClick = () => {
    if (localStorage.getItem("user")) {
      const local = JSON.parse(localStorage.getItem("user"));
      const token = local.token;
      if (isFavourite) {
        setFavourite(false);
        var data = {
          token: token,
          ItemId: props.data.ItemId,
          isDelete: true,
        };
        axios.post(API+"/item/set-remove-favourite", data);
      } else {
        setFavourite(true);
         data = {
          token: token,
          ItemId: props.data.ItemId,
          isDelete: false,
        };
        axios.post(API+"/item/set-remove-favourite", data);
      }
    }
    else {
      alert("Sign in to Add Favourites");
    }
  };

  return <>{<Heart isClick={isFavourite} onClick={handleClick} />}</>;
}

export default Favourite;
