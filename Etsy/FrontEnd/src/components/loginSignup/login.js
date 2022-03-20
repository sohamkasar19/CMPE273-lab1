import React, { useState } from "react";
import {
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import axios from "axios";

const LoginForm = () => {
  const [showError, setShowError] = useState(false);
  const [validEmailStatus, setValidEmailStatus] = useState("");

  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (event) => {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log("validation " + emailRex.test(event.target.value));
    if (emailRex.test(event.target.value)) {
      setValidEmailStatus("has-success");
    } else {
      setValidEmailStatus("has-danger");
    }
  };

  


  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      Email: formValue.email,
      Password: formValue.password,
    };
    axios.post("http://localhost:8080/login", data).then((response) => {
      if (response.status === 200) {
        console.log("before local storage: " + JSON.stringify(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload(false);
        // navigate('/home');
      }
      if (response.status === 201) {
        console.log("Invalid creds");
        setShowError(true);
      }
    });
  };

  const handleChange = (event) => {
  
    if (event.target.name === "email") {
      
      validateEmail(event);
    }
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showError && (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Invalid Credentials</strong>
          </div>
        </div>
      )}
      <FormGroup className="mb-3" controlId="formBasicEmail">
        <Label>Email address</Label>
        <Input
          type="text"
          name="email"
          placeholder="Enter email"
          value={formValue.email}
          invalid={validEmailStatus === "has-danger"}
          valid={validEmailStatus === "has-success"}
          onChange={handleChange}
          required
        />
        <FormFeedback>
          Uh oh! Looks like there is an issue with your email. Please input a
          correct email.
        </FormFeedback>
        <FormFeedback valid>
          That's a tasty looking email you've got there.
        </FormFeedback>
      </FormGroup>
      <FormGroup className="mb-3" controlId="formBasicPassword">
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formValue.password}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <div className="d-grid gap-2 rounded-circle">
        <Button   type="submit"  onClick={handleSubmit}>
          {" "}
          Login
        </Button>
      </div>
    </Form>
  );
};
export default LoginForm;
