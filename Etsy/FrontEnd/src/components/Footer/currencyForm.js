import React from "react";
import { Form,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { changeCurrency } from "../actions/cartActions";
// import EuroIcon from "@mui/icons-material/Euro";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import { MenuItem } from "@mui/material";
const CurrencyForm = (props) => {

  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();

  const options = [
    { value: "USD", label: "USD" },
    { value: "Euro", label: "Euro" },
    { value: "INR", label: "INR" },
  ];
  const [formValue, setformValue] = React.useState(reduxState.currency);

  

  // const [handleChange] = React.useState(() => {
  //     return () => {
  //         setformValue(formValue);
  //         console.log(formValue);
  //     };
  // });
  const handleChange = (event) => {
    setformValue(event.value);
  };
 

  const handleSave = () => {
    // setcurrencyvalue(formValue);
    dispatch(changeCurrency(formValue))
    props.onHide();
  };
  

  return (
    <Form>
      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Region</Form.Label>
        <select class="form-select" aria-label="United States">
          <option selected>United States</option>
          <option value="UnitedStates">United States</option>
          <option value="India">India</option>
          <option value="Europe">Europe</option>
        </select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Language</Form.Label>
        <select class="form-select" aria-label="">
          <option selected>English(US)</option>
          <option value="English(US)">English(US)</option>
          <option value="English(UK)">English(UK)</option>
        </select>
      </Form.Group> */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Currency</Form.Label>
        <Select
          name="name"
          placeholder={formValue}
          
          // searchable={false}
          value={formValue}
          options={options}
          onChange={handleChange}
        />
      </Form.Group>
      <div style={{ float: "right" }}>
        <Button variant="dark" type="submit" size="sm" onClick={handleSave}>
          {" "}
          Save
        </Button>
      </div>
    </Form>
  );
};
export default CurrencyForm;
