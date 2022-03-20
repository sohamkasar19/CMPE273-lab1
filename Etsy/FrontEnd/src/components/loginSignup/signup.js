import { React, useState } from "react";
import {
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";

const SignupForm = () => {
  const [formValue, setformValue] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [validEmailStatus, setValidEmailStatus] = useState("");
  const [validNameStatus, setValidNameStatus] = useState("");
  const [validPasswordStatus, setValidPasswordStatus] = useState("");
  const validateEmail = (event) => {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // console.log("validation " + emailRex.test(event.target.value));
    if (emailRex.test(event.target.value)) {
      setValidEmailStatus("has-success");
    } else {
      setValidEmailStatus("has-danger");
    }
  };
  const validateName = (event) => {
    if (/[^a-zA-Z]/.test(event.target.value)) {
      setValidNameStatus("has-success");
    } else {
      setValidNameStatus("has-danger");
    }
  };
  const validatePassword = (event) => {
    if (/[^a-zA-Z]/.test(event.target.value)) {
      setValidPasswordStatus("has-success");
    } else {
      setValidPasswordStatus("has-danger");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      Email: formValue.email,
      Password: formValue.password,
      Name: formValue.name,
    };
    console.log(data);
    axios.post("http://localhost:8080/signup", data).then((response) => {
      if (response.status === 200) {
        alert("You are signed up. Proceed To login");
        window.location.reload(false);
      }
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "email") {
      validateEmail(event);
    }
    if (event.target.name === "name") {
      validateName(event);
    }
    if (event.target.name === "password") {
      validatePassword(event);
    }
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-3" >
        <Label>Email address</Label>
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          invalid={validEmailStatus === "has-danger"}
          valid={validEmailStatus === "has-success"}
          value={formValue.email}
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

      <FormGroup className="mb-3" >
        <Label>First Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          
          value={formValue.name}
          onChange={handleChange}
          required
        />
        
      </FormGroup>
      
      <FormGroup className="mb-3" >
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
        <Button variant="dark" type="submit" onClick={handleSubmit}>
          Signup
        </Button>
      </div>
    </Form>
  );
};
export default SignupForm;
