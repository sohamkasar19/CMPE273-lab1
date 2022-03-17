import axios from "axios";
import React, { useEffect, useState } from "react";
import "./profilePage.css";
import EditIcon from "@mui/icons-material/Edit";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});

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
    if (isSubscribed) {
      fetchUserData().catch(console.error);
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
        <img
            id="profile-image"
            src={userData.ProfileImage}
            alt="Avatar"
            style={{ width: "200px" }}
          />
          
          <h2 class="display-4">{userData.Name}</h2>
          <EditIcon />
          <p class="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
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
