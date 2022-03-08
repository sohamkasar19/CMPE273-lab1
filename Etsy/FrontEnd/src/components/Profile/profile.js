import axios from "axios";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import './profile.css';

export const Profile = () => {
  const [formValue, setformValue] = React.useState({
    ProfileId: "",
    Email: "",
    Name: "",
    DOB: "",
    About: "",
    Country: "",
    City: "",
    Address: "",
    Gender: "",
    ProfileImage: "",
    Phonenumber: ""
  });
  useEffect(() => {
    axios.get('http://localhost:8080/profile').then((response) => {
      if(response.status === 200) {
        console.log(response.data);
        var data = response.data;
        setformValue({
          ProfileId: data.ProfileId,
          Email: data.Email,
          Name: data.Name,
          DOB: data.DOB,
          About: data.About,
          Country: data.Country,
          City: data.City,
          Address: data.Address,
          Gender: data.Gender,
          ProfileImage: data.ProfileImage,
          Phonenumber: data.Phonenumber
        })
      }
    })
  });


  const handleChange = (event) => {
    if(event.target.name !== 'ProfileImage') {
      var profilePhoto = event.target.files[0];
      var data = new FormData();
      data.append('photos', profilePhoto);
      axios.post('http://localhost:8080/profile/upload-photo', data);
    }else {
      setformValue({
        ...formValue,
        [event.target.name]: event.target.value,
      });
    }
  }
  return (
    <div>
      <NavBar>New navigation</NavBar>
      {/* <Container fluid> */}
      <div id="content" class="clear " role="main">
        {/* <Row className="justify-content-md-center"> */}
          {/* <Col xs lg="2"> */}
            <div className="grid-child green">
              <div id="content" className="clear " role="main">
                <link
                  rel="stylesheet"
                  href="https://www.etsy.com/ac/primary/css/base.20220304135846.css"
                  type="text/css"
                />
                {/* <link
                rel="stylesheet"
                href="https://www.etsy.com/dac/common/web-toolkit/scoped/scoped_fixed_shared.20220304135846,common/web-toolkit/v1_toolkit_with_v2_footer/fixed-global-nav.20220304135846,common/web-toolkit/a11y_colors/overrides.20220304135846.css"
                type="text/css"
              /> */}
                <link
                  rel="stylesheet"
                  href="https://www.etsy.com/dac/site-chrome/components/components.20220304135846,site-chrome/header/header.20220304135846,site-chrome/footer/footer.20220304135846,gdpr/settings-overlay.20220304135846.css"
                  type="text/css"
                />
                <link
                  rel="stylesheet"
                  href="https://www.etsy.com/dac/your/profile.20210909222603,modules/autosuggest.20210909222603,your-etsy.20220304135846,your/account/settings.20220304135846,modules/forms.20210909222603.css"
                  type="text/css"
                />
                {/* <div className="secondary">
                  <div
                    className="your-etsy-nav your-etsy-nav-profile is-seller"
                    role="navigation"
                    aria-label="account"
                  >
                    <ul className="last">
                      <li className="purchases quick-link">
                        <a href="https://www.etsy.com/your/purchases?ref=si_purchases">
                          Purchases &amp; Reviews
                        </a>
                      </li>
                      <li className="profile quick-link">
                        <a href="https://www.etsy.com/your/profile?ref=si_profile">
                          Public Profile
                        </a>
                      </li>
                      <li className="account-info quick-link">
                        <a href="https://www.etsy.com/your/account?ref=si_settings">
                          Settings
                        </a>
                      </li>
                      <li className="applications quick-link">
                        <a href="https://www.etsy.com/your/apps?ref=si_apps">
                          Apps
                        </a>
                      </li>
                      <li className="prototypes quick-link">
                        <a href="https://www.etsy.com/prototypes?ref=si_prototypes">
                          Prototypes
                        </a>
                      </li>
                      <li className="quick-link">
                        <a
                          id="sign-out"
                          href="https://www.etsy.com/logout.php?ref=si_logout"
                        >
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
          {/* </Col> */}
          {/* <Col xs lg="6"> */}
            <div className="container">
              <div className="primary profile-edit">
                <div className="your-etsy-header clear">
                  <h1 style={{ float: "left" }}>Your Public Profile</h1>
                  <p style={{ float: "left" }}>
                    Everything on this page can be seen by anyone
                  </p>
                  <a
                    className="view-profile btn-secondary small registration-hidden"
                    href=""
                  >
                    View Profile
                  </a>
                </div>
                <form
                  class="section-inner"
                  encType="multipart/form-data"
                >
                  <div class="input-group">
                    <label class="label" for="avatar">
                      Profile Picture
                    </label>
                    <div class="change-avatar-content">
                      <input
                        type="file"
                        class="upload-new-avatar"
                        id="avatar"
                        name="ProfileImage"
                        size="15"
                        aria-describedby="changing-avatar-disabled avatar-technical-hint"
                        onChange={handleChange}
                      />

                      <div class="image-wrapper user-avatar-wrapper">
                        <img
                          id="avatar_img"
                          src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"
                          alt=""
                          class="img-fluid rounded-circle"
                        />
                      </div>
                    </div>

                    <span class="inline-message" id="avatar-technical-hint">
                      Must be a .jpg, .gif or .png file smaller than 10MB and at
                      least 400px by 400px.
                    </span>
                  </div>
                  <hr />
                  <div
                    class="input-group"
                    id="name"
                    role="group"
                    aria-labelledby="your-name-label"
                  >
                    <label class="label" id="your-name-label">
                      Your Name
                    </label>
                    <p class="full-name" id="full-name">
                      Soham&nbsp;
                      <a
                        class="request-name-change overlay-trigger"
                        href="#namechange-overlay"
                        rel="#namechange-overlay"
                        aria-describedby="your-name-label"
                      >
                        Change or remove
                      </a>
                    </p>
                  </div>
                  <hr />
                  <fieldset>
                  <div
                    class="gender-class"
                    role="group"
                    aria-labelledby="gender-group-label"
                  >
                    <label class="label" id="gender-group-label">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender
                    </label>
                    {/* <div class="radio-group" id="gender"> */}
                    <label for="female">Female
                      <input
                        type="radio"
                        value="female"
                        name="gender"
                        id="female"
                      />
                    </label>
                    <label for="male">Male
                      <input
                        type="radio"
                        value="male"
                        name="gender"
                        id="male"
                      />
                    </label>

                    <label for="private">Rather not say
                      <input
                        type="radio"
                        value="private"
                        name="gender"
                        id="private"
                        checked
                      />
                    </label>

                    
                    {/* </div> */}
                  </div>
                  </fieldset>
                  <hr class="registration-hidden" />
                  <div class="input-group location-city">
                    <label class="label" for="city3">
                      City
                    </label>
                    <div class="autosuggest-wrapper">
                      <input
                        aria-describedby="the_reason"
                        type="text"
                        autocomplete="off"
                        name="city3"
                        id="city3"
                        value=""
                        class="text"
                      />
                    </div>
                    <p id="the_reason" class="inline-message">
                      Start typing and choose from a suggested city to help
                      others find you.
                    </p>
                  </div>
                  <hr />
                </form>
              </div>
            </div>
          {/* </Col> */}
        {/* </Row> */}
      {/* </Container> */}
      </div>
    </div>
  );
};
export default Profile;
