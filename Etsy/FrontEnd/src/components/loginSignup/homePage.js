import React, {useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import LoginForm from './login';




function Home() {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
        return (
            <>
            <div>
                <button onClick={handleShow}>LOGIN</button>
                
            </div>
            

            <Modal show= {show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
            </Modal>
                
            </>
            
        )
    
}
// render(<Home />);
export default Home;