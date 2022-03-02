import React from "react";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [formValue, setformValue] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    // we will fill this in the coming paragraph
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={formValue.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};
export default LoginForm;
