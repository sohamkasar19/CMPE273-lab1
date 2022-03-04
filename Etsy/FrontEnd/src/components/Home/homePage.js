// import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import LoginForm from "../loginSignup/login";
// import SignupForm from "../loginSignup/signup";

function Home() {
  // const [showLogin, setShowLogin] = useState(false);
  // const handleCloseLogin = () => setShowLogin(false);
  // const handleShowLogin = () => setShowLogin(true);

  // const [showSignup, setShowSignup] = useState(false);
  // const handleCloseSignup = () => setShowSignup(false);
  // const handleShowSignup = () => {
  //   setShowLogin(false);
  //   setShowSignup(true);
  // }

  return (
    <>
      {/* <div>
        <button onClick={handleShowLogin}>LOGIN</button>
      </div>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
          <Button variant="primary" type="submit" onClick={handleShowSignup}>
            Signup
          </Button>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>

      <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm />
        </Modal.Body>
      </Modal> */}
    </>
  );
}
// render(<Home />);
export default Home;
