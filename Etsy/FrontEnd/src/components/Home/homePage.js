import axios from "axios";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";

const HomePage = () => {
  let welcomeBoard = (
    <h1>Explore one-of-a-kind finds from independent makers</h1>
  );
  const [formValue, setformValue] = React.useState({
    ProfileId: "",
    Name: "",
  });
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
        Welcome to Etsy,{" "}
        <a href="/profile">
          {formValue.Name}
        </a>
        !
      </>
    );
  } else {
    welcomeBoard = <>Explore one-of-a-kind finds from independent makers</>;
  }

  return (
    <>
      <div>
        <NavBar>New navigation</NavBar>

        <Card
        style={{
          "textAlign": "center",
          background: "#fdebd2",
          height: "200px",
        }}
      >
        <Card.Body>
          <Card.Text
            style={{ "fontSize": "50px", "fontFamily": "Times New Roman" }}
          >
            {welcomeBoard}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </>
  );
};
export default HomePage;
