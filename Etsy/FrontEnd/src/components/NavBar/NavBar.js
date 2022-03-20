import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import LoginSignupButton from "../loginSignup/loginSignupButton";
import LogoutButton from "../loginSignup/logoutButton";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from "axios";
import {API} from '../../Backend';

function NavBar() {
  let navigate = useNavigate();
  let LoginLogOutButton = null;
  let Favourite = null;
  let ShopButton = null;
  let CartButton = null;

  const [searchEntry, setSearchEntry] = useState("");

  const handleShopIconClick = async () => {
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
  if (localStorage.getItem("user")) {
    Favourite = (
      <div>
        <Nav.Link
          className="border-left pl-2 ms-auto"
          onClick={() => navigate("/profile-page")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="26"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 14"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </Nav.Link>
      </div>
    );
    ShopButton = (
      <div>
        <Nav.Link className="border-left pl-2 ms-auto">
          <StoreIcon
            fontSize="medium"
            sx={{ width: "20", height: "26", color: "black" }}
            onClick={handleShopIconClick}
          />
          &nbsp;&nbsp;
        </Nav.Link>
      </div>
    );
    LoginLogOutButton = (
      <Dropdown className="border-left pl-2 ms-auto">
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => {
              navigate("/profile-page");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            &nbsp;&nbsp;&nbsp;View Profile
          </Dropdown.Item>
          <Dropdown.Item href="/home">
            <LogoutButton />
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => navigate('/purchase')}>
          <ShoppingBagIcon/> &nbsp;Purchases
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    CartButton = (
      <Nav.Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-cart4"
                  viewBox="0 0 16 16"
                  onClick={(e) => navigate("/cart")}
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </Nav.Link>
    )
  } else {
    // navigate("/home")
    LoginLogOutButton = (
      <Nav.Link className="border-left pl-2 ms-auto" href="">
        <LoginSignupButton />
      </Nav.Link>
    );
  }

  const handleSearchClick = () => {
    if (searchEntry.length > 0) {
      navigate("/search-page", {
        state: searchEntry,
      });
    }
  };
  const handleSearchChange = (event) => {
    setSearchEntry(event.target.value);
  };
  return (
    <>
      <div></div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <h2 style={{ color: "red" }} onClick={(e) => navigate("/home")}>
              &nbsp;&nbsp;&nbsp; Etsy
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="container-fluid"
              style={{ maxHeight: "100px" }}
              navbarScroll
              //className="ml-auto"
            >
              <Form className="d-flex ms-auto">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="form-control-lg me-2"
                  aria-label="Search"
                  value={searchEntry}
                  onChange={handleSearchChange}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleSearchClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  {/* Search */}
                </Button>
              </Form>
              {LoginLogOutButton}
              {ShopButton}
              {Favourite}
              &nbsp;&nbsp;&nbsp;
              {CartButton}
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
// render(<Home />);
export default NavBar;
