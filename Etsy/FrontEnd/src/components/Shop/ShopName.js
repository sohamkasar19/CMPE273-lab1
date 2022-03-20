import React, { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate } from "react-router";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/footer";
import {API} from '../../Backend';

function ShopName() {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState("");
  const [shopName, setShopName] = useState("");
  

  useEffect(() => {
    if(!localStorage.getItem("user")) {
      navigate('/home');
      window.location.reload(false);
    }
    const fetchIfShopExists = async () => {
      const local = JSON.parse(localStorage.getItem("user"));
      const token = local.token;
      let response = await axios.get(
        API+"/shop/check-shop-exists",
        {
          params: {
            token: token,
          },
        }
      );
      if (response.data !== "Not Found") {
        navigate("/your-shop", {
          state: response.data,
        });
      }
    };
    fetchIfShopExists().catch(console.error);
  }, [navigate]);

  let checkShopName = async () => {
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    let response = await axios.get(
      API+"/shop/check-shop-name",
      {
        params: {
          token: token,
          nameToCheck: shopName,
        },
      }
    );
    setIsAvailable(response.data);
  };

  let addShopName = async () => {
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    var data = {
      token: token,
      nameToAdd: shopName,
    };
    await axios.post(API+"/shop/add-shop-name", data);
    navigate("/your-shop", {
      state: shopName,
    });
  };

  const handleChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const handleClickContinue = () => {
    if (isAvailable === true) {
      addShopName();
    }
  };
  const handleClickCheckAvailable = () => {
    if (shopName.length !== 0) {
      checkShopName();
    }

    console.log(isAvailable);
  };

  return (
    <>
      <div class="content-container">
        <NavBar>New navigation</NavBar>
        <div className="d-flex justify-content-center">
          <br />
          <br />
          <div className="card text-center" style={{ width: "50rem" }}>
            <div className="card-header">
              <h2>Name Your Shop</h2>
            </div>
            <div className="card-body">
              <InputGroup className="col-md-4">
                <FormControl
                  placeholder="Enter Shop Name"
                  style={{ borderRadius: 35 }}
                  value={shopName}
                  onChange={handleChangeShopName}
                  required
                />
                {isAvailable === false && (
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#cc0000",
                    }}
                    startIcon={<ClearIcon />}
                  >
                    Not Available
                  </Button>
                )}
                {isAvailable === true && (
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#6aa84f",
                    }}
                    startIcon={<CheckIcon />}
                  >
                    Available
                  </Button>
                )}
                <Button
                  style={{
                    borderRadius: 35,
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  }}
                  variant="contained"
                  onClick={handleClickCheckAvailable}
                >
                  Check Availability
                </Button>
              </InputGroup>
            </div>

            <div className="card-footer text-muted">
              <div className="d-flex justify-content-end">
                {isAvailable === true && (
                  <Button
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#000000",
                      color: "#ffffff",
                    }}
                    variant="contained"
                    onClick={handleClickContinue}
                  >
                    Save and Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer--pin">
        <Footer  />
      </div>
    </>
  );
}

export default ShopName;
