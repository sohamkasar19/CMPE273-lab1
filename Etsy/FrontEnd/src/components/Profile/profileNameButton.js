import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ProfileNameButton() {
  const [showProfileName, setShowProfileName] = useState(false);

  const handleCloseProfileName = () => setShowProfileName(false);
  const handleShowProfileName = () => setShowProfileName(true);

  return (
    <>
      <div>
        <Button
          variant="outline-dark"
          size="sm"
          onClick={handleShowProfileName}
        >
          {" "}
          Change or remove
        </Button>
      </div>

      <Modal show={showProfileName} onHide={handleCloseProfileName} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Body>
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
              </div>
            </div>
            <div class="overlay-footer">
                    <div class="primary-actions">
                        <span class="button-medium button-medium-disabled" id="overlay-save"><span><input type="submit" name="save" value='Save Changes' /></span></span>
                        <span class="button-medium button-medium-grey close" id="overlay-cancel"><span><input type="button" name="cancel" value='Cancel' /></span></span>
                    </div>
                </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
// render(<Home />);
export default ProfileNameButton;
