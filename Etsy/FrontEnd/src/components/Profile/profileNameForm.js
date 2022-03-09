import { React, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ProfileNameForm = () => {
  const [formValue, setformValue] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.user.userdetails.ProfileId;
    // const token = local["user"];
    console.log("Inside useEffect profile" + local.user.token);
    axios
      .get("http://localhost:8080/profile", {
        params: {
          token: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Inside useEffect profile" + response.data);
          var data = response.data;
          var fullname = data.Name; // object format: first name(s) last name
          setformValue({
            firstName: fullname.substring(0, fullname.lastIndexOf(" ") + 1),
            lastName: fullname.substring(
              fullname.lastIndexOf(" ") + 1,
              fullname.length
            ),
          });
        }
      });
  }, []);

  const handleSubmit = (event) => {
    var data = {
      Name: formValue.firstName + " " + formValue.lastName,
    };
    axios.post("http://localhost:8080/profile", data).then((response) => {
      if (response.status === 200) {
        console.log("Axios post from profile name submit");
      }
    });
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form class="namechange-overlay-form">
      <div class="overlay-header">
        <h6>Change or Remove Your Name</h6>
        <p>These fields are for your full name.</p>
      </div>
      <div class="overlay-body change-name-overlay">
        <div class="input-group input-group-stacked">
          <label for="new-first-name">First Name</label>
          <input
            value=""
            name="new-first-name"
            id="new-first-name"
            maxlength="40"
            class="text"
            type="text"
          />
          <span class="inline-input-error-message" id="new-first-name-error">
            Your first name contains invalid characters.
          </span>
        </div>
        <div class="input-group input-group-stacked">
          <label for="new-last-name">Last Name</label>
          <input
            value=""
            id="new-last-name"
            name="new-last-name"
            maxlength="40"
            class="text"
            type="text"
          />
          <span class="inline-input-error-message" id="new-last-name-error">
            Your last name contains invalid characters.
          </span>
        </div>
      </div>
    </form>
  );
};
export default ProfileNameForm;
