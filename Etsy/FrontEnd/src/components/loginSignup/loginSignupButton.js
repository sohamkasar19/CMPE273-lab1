import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "./login";
import SignupForm from "./signup";

function LoginSignupButton() {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showSignup, setShowSignup] = useState(false);
  const handleShowSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };
  const handleCloseSignup = () => setShowSignup(false);

  return (
    <>
      <div>
        <Button variant="outline-dark" size="sm" onClick={handleShowLogin}>
          {" "}
          Sign in
        </Button>
      </div>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>
            Login
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="float-right" variant="outline-dark" size="sm" onClick={handleShowSignup}  style={{ marginLeft: "auto" }}>
              {" "}
              Register
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>

      <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Create your account </h4>
            <h6>Registration is easy.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm />
        </Modal.Body>
      </Modal>
    </>
  );
}
// render(<Home />);
export default LoginSignupButton;