import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { InputLabel } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

function ShopName() {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState("");
  const [shopName, setShopName] = useState("");
  let availabilityStatus = null;
  if (isAvailable === "true") {
    availabilityStatus = (
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
    );
  }
  if (isAvailable === "false") {
    availabilityStatus = (
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
    );
  }

  let checkShopName = async () => {
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    let response = await axios.get(
      "http://localhost:8080/shop/check-shop-name",
      {
        params: {
          token: token,
          nameToCheck: shopName,
        },
      }
    );
    if(response.data === "true") {
        setIsAvailable(true);
    }
    else {
        setIsAvailable(false);
    }
  };

  const handleChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const handleClickContinue = () => {
    if (isAvailable === "true") {
      navigate("/your-shop", {
        state: shopName,
      });
    }
  };
  const handleClickCheckAvailable = () => {
    checkShopName();
    console.log(isAvailable);
  };

  return (
    <div className="d-flex justify-content-center">
      <br />
      <br />
      <div className="card text-center" style={{ width: "50rem" }}>
        <div class="card-header">
          <h2>Name Your Shop</h2>
        </div>
        <div class="card-body">
          <InputGroup className="col-md-4">
            <FormControl
              placeholder="Enter Shop Name"
              style={{ borderRadius: 35 }}
              value={shopName}
              onChange={handleChangeShopName}
            />
            {!isAvailable && (
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
            {isAvailable && (
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
            <Button
              style={{
                borderRadius: 35,
                backgroundColor: "#000000",
                color: "#ffffff",
              }}
              variant="contained"
              onClick={handleClickContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopName;
